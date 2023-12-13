from Job_Board_Backend import views
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('jobs/', views.Job_list.as_view()),
    path('employer/', views.Employer_list.as_view()),
    path('applicant/', views.Applicant_list.as_view()),
    path('jobs/<int:pk>/', views.Job_list_Detail.as_view()),
    path('token/',
         jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    path('signup/applicant', views.ApplicantUserCreate.as_view()),
    path('signup/employer', views.EmployerUserCreate.as_view()),
    path('home/employer', views.EmployerHomeView.as_view()),
    path('home/applicant', views.ApplicantHomeView.as_view()),
    path('jobCreate/', views.JobCreate.as_view())
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)