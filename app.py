from flask import Flask, render_template, request, jsonify
import os, random, shutil
from datetime import datetime

app = Flask(__name__)
UPLOAD_FOLDER = 'static/generated'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        
        """ здесь должна быть функция генерации фрактала и музыки """
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        random_num = random.randint(1000, 9999)
        filename = f"fractal_{timestamp}_{random_num}.png"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # изображение плейсхолдер
        test_images = ['lsystem_g.png', 'mand_g.png', 'julia_g.png']
        selected_image = random.choice(test_images)
        shutil.copyfile(f'static/{selected_image}', filepath)
        
        return jsonify({
            'success': True,
            'image_path': f"static/generated/{filename}"
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)