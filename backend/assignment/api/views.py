from base64 import b64encode

from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView
)

from assignment.models import (
    RecruitmentInformation,
    CVFile
)
from rest_framework.response import Response

from .serializers import (
    InformationSerializer,
    CVFileUploadSerializer
)

import requests
import json


class InformationDetailView(RetrieveAPIView):
    queryset = RecruitmentInformation.objects.all()
    serializer_class = InformationSerializer


class InformationCreateView(CreateAPIView):
    queryset = RecruitmentInformation.objects.all()
    serializer_class = InformationSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        print('-------------------------------')
        print('Info post working')

        login_url = 'https://recruitment.fisdev.com/api/login/'
        login_data = {'username': 'ahredoan@gmail.com', 'password': 'p6MnIgh75'}
        headers1 = {'Content-type': 'application/json'}
        login_res = requests.post(url=login_url, data=json.dumps(login_data), headers=headers1)

        token = login_res.json()['token']
        # For test
        # url = 'https://recruitment.fisdev.com/api/v0/recruiting-entities/'
        # For submit real data
        url = 'https://recruitment.fisdev.com/api/v1/recruiting-entities/'

        data = response.data
        headers2 = {'Content-type': 'application/json', 'Authorization': 'Token {}'.format(token)}
        info_res = requests.post(url, data=json.dumps(data), headers=headers2)

        print('Info post done')
        print('-------------------------------')
        return Response({
            'status': 201,
            'message': 'Created successfully',
            'data': info_res.json()
        })


class CVUploadView(UpdateAPIView):
    queryset = CVFile.objects.all()
    serializer_class = CVFileUploadSerializer
    lookup_field = 'tsync_id'

    def perform_update(self, serializer):
        serializer.save()

        print('----------------------')
        print('CV file post working')

        login_url = 'https://recruitment.fisdev.com/api/login/'
        login_data = {'username': 'ahredoan@gmail.com', 'password': 'p6MnIgh75'}
        headers1 = {'Content-type': 'application/json'}
        login_res = requests.post(url=login_url, data=json.dumps(login_data), headers=headers1)

        token = login_res.json()['token']
        file_token_id = serializer.data['file_token_id']

        headers2 = {
            'Content-Type': "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
            'Authorization': 'Token {}'.format(token)
        }
        cv_url = 'https://recruitment.fisdev.com/api/file-object/{}/'.format(file_token_id)

        cv_file = serializer.validated_data['cv_file']
        file = b64encode(cv_file.read()).decode('utf-8')
        obj = {
            'file': file
        }
        cv_res = requests.put(url=cv_url, data=obj, headers=headers2)
        print(cv_res.json())
        print('CV file post done')
        print('----------------------')
