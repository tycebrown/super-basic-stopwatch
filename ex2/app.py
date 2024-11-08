from flask import Flask;
app = Flask(__name__);

from api import api_bp
from pages import pages_bp

app.register_blueprint(api_bp)
app.register_blueprint(pages_bp)

