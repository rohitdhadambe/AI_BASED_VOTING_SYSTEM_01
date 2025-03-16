from flask import Flask, request, jsonify
from flask_cors import CORS
from extract_aadhar import extract_text, extract_aadhar_number
from database import insert_aadhar_data, check_voted, check_duplicate

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"message": "No file uploaded", "redirect": False}), 400

    file = request.files['file']
    entered_aadhar = request.form.get("entered_aadhar")
    phone_number = request.form.get("phone_number")
    name = request.form.get("name")

    if not entered_aadhar or not phone_number or not name:
        return jsonify({"message": "Missing required fields", "redirect": False}), 400

    file_path = f"./uploads/{file.filename}"
    file.save(file_path)

    try:
        extracted_text = extract_text(file_path)
        aadhar_numbers = extract_aadhar_number(extracted_text)

        if not aadhar_numbers:
            return jsonify({"message": "No valid Aadhaar number found", "redirect": False}), 400

        extracted_aadhar = aadhar_numbers[0]

        # Check if entered and extracted Aadhaar numbers match
        if entered_aadhar != extracted_aadhar:
            return jsonify({"message": "Entered Aadhaar does not match extracted Aadhaar.", "redirect": False}), 400

        # Check if the Aadhaar number or phone number is already in the database
        if check_duplicate(entered_aadhar, phone_number):
            return jsonify({"message": "Aadhaar or Phone number already used for voting.", "redirect": False}), 400

        # Insert record into the database
        insert_aadhar_data(name, phone_number, entered_aadhar, extracted_aadhar)  # ✅ Correct number of arguments


        return jsonify({"message": "Aadhaar verified successfully! Redirecting to vote page.", "redirect": True}), 200

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}", "redirect": False}), 500

if __name__ == "__main__":
    app.run(debug=True)
