import email
from server.db import get_db
from server.models import User, File, Content
from flask import redirect


def check_for_existing_number(content, number):
  check = True
  for row in content:
    if row.number == number:
      check = False
      # not sure that I care about checking for the 'parent number?'
    elif isinstance(number, float):
      if row.number == int(number):
        check = True
  if not check:
    return False
 
  return True

def file_belongs_to_user(email, file_id):
  db = get_db()
  try:
    user = db.query(User).filter(User.email == email).one()
    file = db.query(File).filter(File.id == file_id).one()
    if file.user_id == user.id:
      return True
  except: 
    return False
