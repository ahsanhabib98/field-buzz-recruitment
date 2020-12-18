from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView
)

from assignment.models import (
    RecruitmentInformation,
    CVFile
)

from .serializers import (
    InformationSerializer,
    CVFileUploadSerializer
)


class InformationDetailView(RetrieveAPIView):
    queryset = RecruitmentInformation.objects.all()
    serializer_class = InformationSerializer


class InformationCreateView(CreateAPIView):
    queryset = RecruitmentInformation.objects.all()
    serializer_class = InformationSerializer


class CVUploadView(UpdateAPIView):
    queryset = CVFile.objects.all()
    serializer_class = CVFileUploadSerializer
    lookup_field = 'tsync_id'
