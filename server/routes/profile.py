
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

bp = Blueprint('profile', __name__, url_prefix='/profile')

@bp.route('/')
@jwt_required()
def test():
  db = get_db()
  token_results = get_jwt()
  email = token_results['sub']
  file_dict= {}
  counter = 0
  user = db.query(User).filter(User.email == email).one()
  files = db.query(File).filter(File.user_id == user.id).all()

  for row in files:
    file_dict[counter] = {
      "id": row.id,
      "user": user.username,
      "title": row.title,
      "tagline": row.tagline,
      "image": row.image,
      "collaborators": row.collaborators
    }
    counter += 1

  return { "files": file_dict }

