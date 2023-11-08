from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *
#from .views import PostViewSet

post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)
post_router.register(r'placeholder', PlaceHolder)
post_router.register(r'dictionary', DictionaryProperty)
post_router.register(r'family', Family)
post_router.register(r'parentfamily', ParentFamily)
post_router.register(r'well', Well)
post_router.register(r'rock', Rock)
post_router.register(r'rockresearch', RockResearch)
post_router.register(r'rockparamvalue', RockParamValue)
#post_router.register(r'upload-file', FileUpload)

urlpatterns = [
    path('upload-file/', FileUpload.as_view(), name='upload-file'),
]