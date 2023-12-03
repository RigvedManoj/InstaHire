from django.urls import path
from Job_Board_Backend import views

urlpatterns = [
    path('jobs/', views.Job_list.as_view()),
    path('employer/', views.Employer_list.as_view()),
    path('applicant/', views.Applicant_list.as_view()),
    path('jobs/<int:pk>/', views.Job_list_Detail.as_view()),
]
    