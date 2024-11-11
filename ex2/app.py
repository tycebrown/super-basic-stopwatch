import os;
from flask import Flask;
from api import api_bp
from pages import pages_bp

def create_app():
    app = Flask(__name__);
    app.register_blueprint(api_bp)
    app.register_blueprint(pages_bp)
    return app;

if __name__ == '__main__':
    app = create_app();
    app.run(port=int(os.environ.get("PORT", 8080)));
