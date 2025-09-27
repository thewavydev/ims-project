from flask import Flask
from flask_cors import CORS
from models import db
import config
from routes import bp as product_routes

app = Flask(__name__)
app.config.from_object(config)
CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(product_routes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
