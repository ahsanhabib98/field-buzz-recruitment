from django.urls import path
from . import views

urlpatterns = [
    path('<pk>/detail/', views.InformationDetailView.as_view(), name='information_detail'),
    # path('create/', views.InformationCreateView.as_view({'post': 'create'}), name='information_create'),
    path('create/', views.InformationCreateView.as_view(), name='information_create'),
    path('upload-cv/<tsync_id>/', views.CVUploadView.as_view(), name='upload_cv')
]
