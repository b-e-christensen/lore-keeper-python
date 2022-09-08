
from os import access, getenv
from flask import Flask, request, Blueprint
from server.db import init_db
import json
import sys
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from server.models import User, File, Content
from server.db import get_db

bp = Blueprint('file', __name__, url_prefix='/file')

@bp.route('/single', methods=['POST'])
@jwt_required()
def test():
  db = get_db()
  token_results = get_jwt()
  email = token_results['sub']
  fileId = request.json.get('fileId')
  print(fileId)
  # user = db.query(User).filter(User.email == email).one()
  file = db.query(File).filter(File.id == fileId).one()

  contents = db.query(Content).filter(Content.file_id == file.id).all()

  fileDict = {
    "id": file.id,
    "title": file.title,
    "collaborators": file.collaborators,
  }


  return { "file": fileDict }

