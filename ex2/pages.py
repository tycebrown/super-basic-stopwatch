from flask import Blueprint, render_template

pages_bp = Blueprint("user", __name__)

@pages_bp.route('/')
def index():
    return render_template("index.html")