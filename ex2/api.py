from flask import Blueprint;

api_bp = Blueprint("api", __name__, url_prefix="/api/user")

users = [
    (1, "raj"),
    (2, "bob"),
    (3, "cody"),
    (4, "jack"),
    (5, "tom"),
];

@api_bp.route("/<id>")
def findUserName(id):
    user = next(filter(lambda user: user[0] == int(id), users), None)
    if user:
        return user[1];
    else:
        return ("User Not Found", 404);