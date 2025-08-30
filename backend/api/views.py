from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.middleware.csrf import get_token
import json

@ensure_csrf_cookie
def get_csrf_token(request):
    token = get_token(request)  # generates + sets cookie
    return JsonResponse({"csrfToken": token})

def home(request):
    return HttpResponse("Hello, Django! 🚀")

def validate_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        body = json.loads(request.body.decode("utf-8"))
        username = body.get("username", "")
        password = body.get("password", "")
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    if len(username) < 3:
        return JsonResponse({"error": "Username must be at least 3 characters"}, status=400)
    if len(password) < 6:
        return JsonResponse({"error": "Password must be at least 6 characters"}, status=400)

    return JsonResponse({"success": True})
