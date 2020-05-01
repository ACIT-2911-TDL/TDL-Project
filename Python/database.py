from sqlalchemy import create_engine

# engine = create_engine('mysql+mysqlconnector://root:password@localhost/tdl')

# Test database
engine = create_engine('mysql+mysqlconnector://root:password@localhost/test_tdl')
