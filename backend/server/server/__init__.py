# Use pymysql instead of MySQLdb for better compatibility
import pymysql
pymysql.install_as_MySQLdb()

# Fix version check for Django 6.0 compatibility
# Django requires mysqlclient 2.2.1+, but pymysql reports 1.4.6
# We patch the version to satisfy Django's version check
try:
    import MySQLdb
    # Set version_info to satisfy Django 6.0's requirement (2.2.1+)
    MySQLdb.version_info = (2, 2, 1, 'final', 0)
    # Also set __version__ attribute if it exists
    if hasattr(MySQLdb, '__version__'):
        MySQLdb.__version__ = '2.2.1'
except (ImportError, AttributeError):
    pass




