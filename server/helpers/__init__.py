
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