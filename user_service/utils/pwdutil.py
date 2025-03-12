from passlib.hash import pbkdf2_sha256

def hash_password(password):
    return pbkdf2_sha256.hash(password)

def check_password(raw_password, hashed_password):
    return pbkdf2_sha256.verify(raw_password, hashed_password)