from Job_Board_Backend import views
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('jobs/', views.applicant_view_job.as_view()),
    path('employer/', views.create_view_employer.as_view()),
    path('applicant/', views.create_view_applicant.as_view()),
    path('jobs/<int:pk>/', views.view_jobs.as_view()),
    path('token/',
          jwt_views.TokenObtainPairView.as_view(),
          name ='token_obtain_pair'),
    path('token/refresh/',
          jwt_views.TokenRefreshView.as_view(),
          name ='token_refresh'),
    path('signup/applicant', views.create_applicant_user.as_view()),
    path('signup/employer', views.create_employer_user.as_view()),
    path('employer/applications/', views.employer_view_applications.as_view()),
    path('applicant/applications/', views.applicant_view_applications.as_view()),
    path('jobCreate/', views.employer_create_job.as_view()),
    path('employerViewApplicant/', views.employer_view_applicant.as_view()),
    path('applicantViewEmployer/',views.applicant_view_employer.as_view())
]


# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)