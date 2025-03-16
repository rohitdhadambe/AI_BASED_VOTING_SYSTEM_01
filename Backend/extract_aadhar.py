import pytesseract
from PIL import Image
import re
import cv2

# Specify the Tesseract executable path (adjust based on your installation location)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def preprocess_image(image_path):
    """Preprocess the image to improve OCR accuracy"""
    image = cv2.imread(image_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    _, threshold_image = cv2.threshold(gray_image, 150, 255, cv2.THRESH_BINARY)  # Apply thresholding
    return threshold_image

def extract_text(image_path):
    """Extract text from an image using OCR"""
    processed_image = preprocess_image(image_path)  # Preprocess the image
    text = pytesseract.image_to_string(processed_image)
    return text  # Return the extracted text without printing it

def extract_aadhar_number(text):
    """Extract and clean Aadhar number from text"""
    cleaned_text = re.sub(r'\s+', ' ', text).strip()  # Replace multiple spaces with a single space
    
    # Regular expression for 12-digit Aadhar numbers
    pattern = r'\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b'  # Matches Aadhar number with optional spaces or hyphens
    
    matches = re.findall(pattern, cleaned_text)
    
    # Clean up the matches by removing any non-digit characters
    aadhar_numbers = [re.sub(r'\D', '', match) for match in matches]
    
    # Return only valid 12-digit Aadhar numbers, and remove duplicates
    valid_aadhar_numbers = list(set(number for number in aadhar_numbers if len(number) == 12))
    
    return valid_aadhar_numbers
