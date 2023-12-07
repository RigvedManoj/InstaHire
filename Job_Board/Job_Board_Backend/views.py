from .models import Job , Employer , Applicant
from .serializers import JobSerializer, EmployerSerializer , ApplicantSerializer ,  ApplicantUserSerializer , EmployerUserSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated 
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework.permissions import AllowAny
from .permissions import ApplicantPermission, EmployerPermission

class Job_list(APIView):
	"""
	List all snippets, or create a new snippet.
	"""
	permission_classes = (IsAuthenticated, )
	def get(self, request, format=None):
		snippets = Job.objects.all()
		serializer = JobSerializer(snippets, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = JobSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Employer_list(APIView):
	"""
	List all snippets, or create a new snippet.
	"""
	permission_classes = (IsAuthenticated, )
	def get(self, request, format=None):
		snippets = Employer.objects.all()
		serializer = EmployerSerializer(snippets, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = EmployerSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Applicant_list(APIView):
	"""
	List all snippets, or create a new snippet.
	"""
	permission_classes = (IsAuthenticated, )
	def get(self, request, format=None):
		snippets = Applicant.objects.all()
		serializer = ApplicantSerializer(snippets, many=True)
		return Response(serializer.data)

	def post(self, request, format=None):
		serializer = ApplicantSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Job_list_Detail(APIView):
	"""
	Retrieve, update or delete a snippet instance.
	"""
	permission_classes = (IsAuthenticated, )
	def get_object(self, pk):
		try:
			return Job.objects.get(pk=pk)
		except Job.DoesNotExist:
			raise Http404

	def get(self, request, pk, format=None):
		snippet = self.get_object(pk)
		serializer = JobSerializer(snippet)
		return Response(serializer.data)

	def put(self, request, pk, format=None):
		snippet = self.get_object(pk)
		serializer = JobSerializer(snippet, data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def delete(self, request, pk, format=None):
		snippet = self.get_object(pk)
		snippet.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)

class ApplicantHomeView(APIView):
   permission_classes = [ApplicantPermission , IsAuthenticated ]
   def get(self, request):
	   content = {'message': 'You have access to this view'}
	   return Response( content )

class EmployerHomeView(APIView):
   permission_classes = [EmployerPermission , IsAuthenticated ]
   def get(self, request):
	   content = {'message': 'You have access to this view'}
	   return Response( content )

class ApplicantUserCreate(APIView):
	""" 
	Creates the user. 
	"""
	permission_classes = [AllowAny]
	def post(self, request, format='json'):
		serializer = ApplicantUserSerializer( data=request.data )
		if serializer.is_valid():
			serializer.save()
			return Response( serializer.data , status = status.HTTP_201_CREATED )
		return Response( serializer.errors , status = status.HTTP_400_BAD_REQUEST )

class EmployerUserCreate(APIView):
	""" 
	Creates the user. 
	"""
	permission_classes = [AllowAny]
	def post(self, request, *args, **kwargs):
		serializer = EmployerUserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
