from DATABASE.database import engine
# from DATABASE.models.user import User
from DATABASE.database import Base

Base.metadata.create_all(bind=engine)