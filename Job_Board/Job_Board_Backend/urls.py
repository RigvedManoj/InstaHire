from django.urls import path, include
from Job_Board_Backend import views
from rest_framework_simplejwt import views as jwt_views
from django.contrib import admin

urlpatterns = [
    path('jobs/', views.Job_list.as_view()),
    path('employer/', views.Employer_list.as_view()),
    path('applicant/', views.Applicant_list.as_view()),
    path('jobs/<int:pk>/', views.Job_list_Detail.as_view()),
    path('token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
    path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh'),
    path('logout/', views.Logout_Implement.as_view())
]
    