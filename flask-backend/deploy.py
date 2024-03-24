import os
import cv2
import base64
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from vehicle_detector import VehicleDetector

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def processimage(filename, operation):
    imgprocessed = cv2.imread(f"static/uploads/{filename}")
    vd = VehicleDetector()
    vehicle_boxes = vd.detect_vehicles(imgprocessed)
    vehicle_count = len(vehicle_boxes)
    for box in vehicle_boxes:
        x, y, w, h = box
        cv2.rectangle(imgprocessed, (x, y), (x + w, y + h), (25, 0, 180), 3)
    cv2.imwrite(f"static/images/{filename}", imgprocessed)
    with open(f"static/uploads/{filename}", "rb") as f:
        uploaded_image_data = base64.b64encode(f.read()).decode('utf-8')
    with open(f"static/images/{filename}", "rb") as f:
        processed_image_data = base64.b64encode(f.read()).decode('utf-8')
    return uploaded_image_data, processed_image_data, vehicle_count

@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        operation = request.form.get('operation', 'identify_vehicles')
        uploaded_image_data, processed_image_data, vehicle_count = processimage(filename, operation)
        return jsonify({
            'uploaded_image': uploaded_image_data,
            'processed_image': processed_image_data,
            'vehicle_count': vehicle_count
        })

    return jsonify({'error': 'Invalid file extension'}), 400

if __name__ == '__main__':
    app.run(debug=True)