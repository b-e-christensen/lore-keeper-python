
from os import access, getenv
from flask import Flask, request, Blueprint
from server.db import init_db
import json
import sys
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from server.models import User, File
from server.db import get_db

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/file', methods=['POST']) 
@jwt_required() # auth wrap
def test():
  db = get_db()

  token_results = get_jwt()
  email = token_results['sub']

  user = db.query(User).filter(User.email == email).one()
  file_name = request.json.get("fileName")
  print(file_name)

  new_file = File(
    title = file_name,
    user_id = user.id
  )

  db.add(new_file)
  db.commit()

  return { "message": "File successfully added!"}