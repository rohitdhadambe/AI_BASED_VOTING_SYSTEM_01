from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from extract_aadhar import extract_text, extract_aadhar_number
from database import insert_aadhar_number, check_voted

app = Flask(__name__)
CORS(app)  # Ensure CORS is enabled for all domains

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"message": "No file uploaded", "redirect": False}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file", "redirect": False}), 400

    # Save the uploaded file locally
    file_path = f"./uploads/{file.filename}"
    file.save(file_path)

    # Extract text from the image
    try:
        extracted_text = extract_text(file_path)
        aadhar_numbers = extract_aadhar_number(extracted_text)

        if not aadhar_numbers:
            return jsonify({"message": "No valid Aadhar number found", "redirect": False}), 400

        aadhar_number = aadhar_numbers[0]  # Use the first valid Aadhar number

        # Check if the user has already voted
        has_voted = check_voted(aadhar_number)
        if has_voted is None:
            # New Aadhar number, insert it and mark as voted
            insert_aadhar_number(aadhar_number, has_voted=True)
            response_data = {"message": "Aadhar number added. Redirecting to vote page.", "redirect": True}
        elif has_voted:
            response_data = {"message": "This user has already voted.", "redirect": False}
        else:
            response_data = {"message": "User can vote.", "redirect": True}

        # Log response data on the backend to ensure it is correct
        print("Sending response:", response_data)

        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}", "redirect": False}), 500


if __name__ == "__main__":
    app.run(debug=True)