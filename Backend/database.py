import psycopg2

# Connect to your PostgreSQL database
def connect_db():
    try:
        conn = psycopg2.connect(
            dbname="Voting",   # The database name you created
            user="postgres",   # The PostgreSQL username
            password="rooot",  # The password you set during PostgreSQL installation
            host="localhost",  # If PostgreSQL is running locally
            port="5432"        # Default PostgreSQL port
        )
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

# Create a new record (insert Aadhar number with has_voted as True or False)
def insert_aadhar_number(aadhar_number, has_voted=True):
    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        try:
            # Check if the Aadhar number already exists
            cursor.execute("SELECT * FROM aadhar_numbers WHERE aadhar_number = %s", (aadhar_number,))
            if cursor.fetchone():
                print("Aadhar number already exists in the database.")
            else:
                # Insert the Aadhar number into the table and mark as voted
                cursor.execute(
                    "INSERT INTO aadhar_numbers (aadhar_number, has_voted) VALUES (%s, %s)", 
                    (aadhar_number, has_voted)
                )
                conn.commit()
                print("Aadhar number inserted successfully and marked as voted.")
        except Exception as e:
            print(f"Error during insertion: {e}")
        finally:
            cursor.close()
            conn.close()

# Check if a user has already voted
def check_voted(aadhar_number):
    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT has_voted FROM aadhar_numbers WHERE aadhar_number = %s", (aadhar_number,))
            result = cursor.fetchone()
            if result:
                return result[0]  # Return True or False
            else:
                print("Aadhar number not found in the database.")
                return None
        except Exception as e:
            print(f"Error during check: {e}")
        finally:
            cursor.close()
            conn.close()

# Example usage
if __name__ == "__main__":
    # Example Aadhar number
    aadhar_number = "123456789012"
    
    # Insert Aadhar number and mark as voted
    insert_aadhar_number(aadhar_number, has_voted=True)
    
    # Check if the user has voted
    has_voted = check_voted(aadhar_number)
    if has_voted is not None:
        if has_voted:
            print("This user has already voted.")
        else:
            print("This user can vote.")
