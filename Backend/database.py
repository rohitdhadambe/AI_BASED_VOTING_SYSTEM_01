import psycopg2

# Connect to PostgreSQL Database
def connect_db():
    try:
        conn = psycopg2.connect(
            dbname="Voting",   
            user="postgres",   
            password="rooot",  
            host="localhost",  
            port="5432"        
        )
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

# Check if Aadhaar or Phone number already exists
def check_duplicate(aadhar_number, phone_number):
    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                SELECT * FROM aadhar_numbers 
                WHERE entered_aadhar = %s OR extracted_aadhar = %s OR phone_number = %s
            """, (aadhar_number, aadhar_number, phone_number))
            
            return cursor.fetchone() is not None  # True if record exists
        except Exception as e:
            print(f"Error during duplicate check: {e}")
            return False
        finally:
            cursor.close()
            conn.close()
    return False

# Insert Aadhaar data (Only if entered and extracted Aadhaar match)
def insert_aadhar_data(name, phone_number, entered_aadhar, extracted_aadhar):
    if entered_aadhar != extracted_aadhar:
        return {"success": False, "message": "Entered Aadhaar does not match extracted Aadhaar."}

    if check_duplicate(entered_aadhar, phone_number):  
        return {"success": False, "message": "Aadhaar number or phone number already registered."}

    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                INSERT INTO aadhar_numbers (name, phone_number, entered_aadhar, extracted_aadhar, has_voted) 
                VALUES (%s, %s, %s, %s, %s)
            """, (name, phone_number, entered_aadhar, extracted_aadhar, False))  # Initially, has_voted = False
            
            conn.commit()
            return {"success": True, "message": "Aadhaar successfully registered. You can now vote."}
        except Exception as e:
            return {"success": False, "message": f"Database error: {e}"}
        finally:
            cursor.close()
            conn.close()

# Check if a user has already voted
def check_voted(aadhar_number):
    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                SELECT has_voted FROM aadhar_numbers 
                WHERE entered_aadhar = %s OR extracted_aadhar = %s
            """, (aadhar_number, aadhar_number))
            
            result = cursor.fetchone()
            if result:
                return result[0]  # True if voted, False otherwise
            else:
                return None  # Aadhaar not found
        except Exception as e:
            print(f"Error during vote check: {e}")
            return None
        finally:
            cursor.close()
            conn.close()

# Mark user as voted
def mark_as_voted(aadhar_number):
    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("""
                UPDATE aadhar_numbers 
                SET has_voted = TRUE 
                WHERE entered_aadhar = %s OR extracted_aadhar = %s
            """, (aadhar_number, aadhar_number))
            
            conn.commit()
            return {"success": True, "message": "User has successfully voted."}
        except Exception as e:
            return {"success": False, "message": f"Error updating vote status: {e}"}
        finally:
            cursor.close()
            conn.close()

# Example Usage
if __name__ == "__main__":
    # Example Test Cases
    user_data = {
        "name": "John Doe",
        "phone_number": "9876543210",
        "entered_aadhar": "123456789012",
        "extracted_aadhar": "123456789012"
    }

    # Register user
    print(insert_aadhar_data(**user_data))

    # Check if the user has voted
    print(check_voted(user_data["entered_aadhar"]))

    # Mark user as voted
    print(mark_as_voted(user_data["entered_aadhar"]))

    # Check again after voting
    print(check_voted(user_data["entered_aadhar"]))
