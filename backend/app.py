from flask import Flask, send_from_directory, request, jsonify, send_file
import os
import sqlite3
from flask_cors import CORS
from werkzeug.utils import secure_filename
from datetime import datetime
import pytz

app = Flask(__name__, static_folder='../frontend/build')
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads/'
DATABASE = os.path.join(os.path.dirname(__file__), 'files.db')

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS files (
            id INTEGER PRIMARY KEY,
            filename TEXT NOT NULL,
            filepath TEXT NOT NULL,
            upload_date TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

with app.app_context():
    init_db()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/files', methods=['GET', 'POST'])
def handle_files():
    conn = get_db_connection()

    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

            est = pytz.timezone('US/Eastern')
            upload_date = datetime.now(est).isoformat()

            conn.execute('INSERT INTO files (filename, filepath, upload_date) VALUES (?, ?, ?)', 
                         (filename, filepath, upload_date))
            conn.commit()
            return jsonify({'message': 'File uploaded successfully'}), 201

    files = conn.execute('SELECT * FROM files').fetchall()
    conn.close()
    files_list = [{'id': file['id'], 'filename': file['filename'], 'upload_date': file['upload_date']} for file in files]
    return jsonify(files_list)

@app.route('/api/files/<int:id>', methods=['DELETE'])
def delete_file(id):
    conn = get_db_connection()
    file = conn.execute('SELECT filepath FROM files WHERE id = ?', (id,)).fetchone()
    if file:
        os.remove(file['filepath'])
    conn.execute('DELETE FROM files WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'File deleted successfully'})

@app.route('/api/files/<int:id>/download', methods=['GET'])
def download_file(id):
    conn = get_db_connection()
    file = conn.execute('SELECT filename, filepath FROM files WHERE id = ?', (id,)).fetchone()
    conn.close()
    if file:
        if os.path.exists(file['filepath']):
            return send_file(
                file['filepath'],
                as_attachment=True,
                attachment_filename=file['filename'],
                mimetype='application/octet-stream'
            )
        else:
            return jsonify({'error': 'File path does not exist on server'}), 404
    return jsonify({'error': 'File not found in database'}), 404

if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)
