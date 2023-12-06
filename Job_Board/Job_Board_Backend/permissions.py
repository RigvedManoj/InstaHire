# permissions.py
from rest_framework.permissions import BasePermission

class ApplicantPermission(BasePermission):
    def has_permission(self, request, view):
        # Your logic to check permissions for applicants
        return request.user.is_authenticated and request.user.is_applicant

class EmployerPermission(BasePermission):
    def has_permission(self, request, view):
        # Your logic to check permissions for employers
        return request.user.is_authenticated and request.user.is_employer