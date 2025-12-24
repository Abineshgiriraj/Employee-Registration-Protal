import requests

base_url = "http://127.0.0.1:8000"

def register(username, password, email):
    url = f"{base_url}/api/auth/register/"
    data = {
        "username": username,
        "password": password,
        "email": email
    }
    response = requests.post(url, json=data)
    print(f"Register Status: {response.status_code}")
    print(f"Register Response: {response.text}")
    return response.status_code == 201

def login(username, password):
    url = f"{base_url}/api/login/"
    data = {
        "username": username,
        "password": password
    }
    response = requests.post(url, json=data)
    print(f"Login Status: {response.status_code}")
    print(f"Login Response: {response.json()}")

if __name__ == "__main__":
    username = "testuser_rbac_py"
    password = "password123"
    email = "test_rbac_py@example.com"
    
    # Try to register (ignore failure if already exists)
    register(username, password, email)
    
    # Try to login
    login(username, password)
