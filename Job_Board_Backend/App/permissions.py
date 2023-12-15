# permissions.py
from rest_framework.permissions import BasePermission


class ApplicantPermission(BasePermission):
    """
    Permissioning logic for Applicant
    """
    def has_permission(self, request, view):
        # Your logic to check permissions for applicants
        return request.user.is_authenticated and request.user.is_applicant


class EmployerPermission(BasePermission):
    """
    Permissioning logic for Employer
    """
    def has_permission(self, request, view):
        # Your logic to check permissions for employers
        return request.user.is_authenticated and request.user.is_employer
