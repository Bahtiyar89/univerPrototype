from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser

from django.db.models import Q

import os
import csv
import codecs

from datetime import datetime

from ..models import Post
from ..models import PlaceHolder as db_PlaceHolder
from ..models import CDictionaryProperty
from ..models import CFamily
from ..models import CParentFamily
from ..models import CWell
from ..models import CRock
from ..models import CRockResearch
from ..models import CRockParamValue
from ..models import CZone
from ..models import CCalculation
from ..models import CFormulaVariables

from .serializers import * #PostSerializer, PlaceHolderSerializer

def ParseLine(dlm, strLine):
        
    name = ''
    unit = ''
    value = ''
    descr = ''
    indField = 0
    prevSymbol = ''
    field = ''

    for symbol in strLine:
        if prevSymbol == '':
            field = field + symbol
            prevSymbol = symbol
            continue

        if symbol == ' ' and indField < 2:
            if prevSymbol != symbol: #перед нами переход от значения к пробелу
                if indField == 0:
                    name = field.strip()
                elif indField == 1:
                    unit = field.strip()
                elif indField == 2:
                    value = field.strip()
                field = ''
                indField = indField + 1
            prevSymbol = symbol            
            continue
        else:
            if symbol == ':':
                value = field.strip()
                field = ''
            field = field + symbol
            prevSymbol = symbol
            continue
    descr = field.strip()

    return name, unit, value, descr


def ParseAscii(strLine):
    listLine = []
    prevSymbol = ''
    field = ''
    for symbol in strLine:
        if prevSymbol == '':
            field = field + symbol
            prevSymbol = symbol
            continue
        if symbol == ' ':
            if prevSymbol != symbol: #перед нами переход от значения к пробелу
                listLine.append(field)
                field = ''
            prevSymbol = symbol            
            continue
        else:
            field = field + symbol
            prevSymbol = symbol
            continue
    listLine.append(field)
    return listLine
    

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class= PostSerializer
    
class PlaceHolder(ModelViewSet):
    queryset = db_PlaceHolder.objects.filter( RecID = 1 )
    serializer_class= PlaceHolderSerializer
    http_method_names = ['delete', 'post', 'get']
    
    def get_queryset(self):
        SearchRecID = self.request.GET.get('RecID')
        print(SearchRecID)
        if SearchRecID == '-1':
            queryset = db_PlaceHolder.objects.all()
        else:
            queryset = db_PlaceHolder.objects.filter( RecID = SearchRecID )
        return queryset
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        queryset = db_PlaceHolder.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
class ParentFamily(ModelViewSet):
    queryset = CParentFamily.objects.filter( RecID = 1 )
    serializer_class= ParentFamilySerializer
    http_method_names = ['delete', 'post', 'get']
    
    def get_queryset(self):
        SearchRecID = self.request.GET.get('RecID')
        print(SearchRecID)
        if SearchRecID == '-1':
            queryset = CParentFamily.objects.all()
        else:
            queryset = CParentFamily.objects.filter( RecID = SearchRecID )
        return queryset
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        queryset = CParentFamily.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
class DictionaryProperty(ModelViewSet):
    queryset = CDictionaryProperty.objects.filter( RecID = 1 )
    serializer_class= DictionaryPropertySerializer
    http_method_names = ['delete', 'post', 'get']
    
    def get_queryset(self):
        SearchRecID = self.request.GET.get('RecID')
        print(SearchRecID)
        if SearchRecID == '-1':
            queryset = CDictionaryProperty.objects.all()
        else:
            queryset = CDictionaryProperty.objects.filter( RecID = SearchRecID )
        return queryset
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        queryset = CDictionaryProperty.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
class Family(ModelViewSet):
    queryset = CFamily.objects.filter( RecID = 1 )
    serializer_class= FamilySerializer
    http_method_names = ['delete', 'post', 'get', 'put','patch']
    
    def get_queryset(self):
        SearchRecID = self.request.GET.get('RecID')
        print(SearchRecID)
        if SearchRecID == '-1':
            queryset = CFamily.objects.all()
        else:
            queryset = CFamily.objects.filter( RecID = SearchRecID )
        return queryset
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        queryset = CFamily.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
    @action(methods=['put'], detail=False)
    def put(self, request):
        RecID = request.POST.get('RecID')
        if RecID == None:
            return Response('-1')
        queryset = CFamily.objects.filter( RecID = RecID )[0]
        if request.POST.get('RecParentFamilyID') != None:
            queryset.RecParentFamilyID = request.POST.get('RecParentFamilyID')
        if request.POST.get('RecName') != None:
            queryset.RecName = request.POST.get('RecName')
        if request.POST.get('RecMin') != None:
            queryset.RecMin = request.POST.get('RecMin')
        if request.POST.get('RecMax') != None:
            queryset.RecMax = request.POST.get('RecMax')
        if request.POST.get('RecLimitInf') != None:
            queryset.RecLimitInf = request.POST.get('RecLimitInf')
        if request.POST.get('RecLimitSup') != None:
            queryset.RecLimitSup = request.POST.get('RecLimitSup')
        if request.POST.get('RecScale') != None:
            queryset.RecScale = request.POST.get('RecScale')
        if request.POST.get('RecColorLogview') != None:
            queryset.RecColorLogview = request.POST.get('RecColorLogview')
        if request.POST.get('RecColorTechlog') != None:
            queryset.RecColorTechlog = request.POST.get('RecColorTechlog')
        if request.POST.get('RecColorTrack') != None:
            queryset.RecColorTrack = request.POST.get('RecColorTrack')
        if request.POST.get('RecType') != None:
            queryset.RecType = request.POST.get('RecType')
        if request.POST.get('RecLineType') != None:
            queryset.RecLineType = request.POST.get('RecLineType')
        if request.POST.get('RecThickness') != None:
            queryset.RecThickness = request.POST.get('RecThickness')
        if request.POST.get('RecMarkerDisplay') != None:
            queryset.RecMarkerDisplay = request.POST.get('RecMarkerDisplay')
        if request.POST.get('RecMarkerType') != None:
            queryset.RecMarkerType = request.POST.get('RecMarkerType')
        if request.POST.get('RecMarkerSize') != None:
            queryset.RecMarkerSize = request.POST.get('RecMarkerSize')
        if request.POST.get('RecWrapDisplay') != None:
            queryset.RecWrapDisplay = request.POST.get('RecWrapDisplay')
        if request.POST.get('RecWrapFact') != None:
            queryset.RecWrapFact = request.POST.get('RecWrapFact')
        if request.POST.get('RecParentFamilyID') != None:
            queryset.RecParentFamilyID = request.POST.get('RecParentFamilyID')
        if request.POST.get('RecParentFamilyID') != None:
            queryset.RecParentFamilyID = request.POST.get('RecParentFamilyID')
        if request.POST.get('RecParentFamilyID') != None:
            queryset.RecParentFamilyID = request.POST.get('RecParentFamilyID')
        if request.POST.get('RecParentFamilyID') != None:
            queryset.RecParentFamilyID = request.POST.get('RecParentFamilyID')
        if request.POST.get('RecParentFamilyID') != None:
            queryset.RecParentFamilyID = request.POST.get('RecParentFamilyID')
        queryset.save()
        return Response(RecID)
class Well(ModelViewSet):
    queryset = CWell.objects.filter( RecID = 1 )
    serializer_class= WellSerializer
    http_method_names = ['delete', 'post', 'get', 'put','patch']
    
    def get_queryset(self):
        SearchRecID = self.request.GET.get('RecID')
        print(SearchRecID)
        if SearchRecID == '-1':
            queryset = CWell.objects.all()
        else:
            queryset = CWell.objects.filter( RecID = SearchRecID )
        return queryset
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        queryset = CWell.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
    @action(methods=['put'], detail=False)
    def put(self, request):
        RecID = request.POST.get('RecID')
        if RecID == None:
            return Response('-1')
        queryset = CWell.objects.filter( RecID = RecID )[0]
        if request.POST.get('RecCountry') != None:
            queryset.RecCountry = request.POST.get('RecCountry')
        if request.POST.get('RecRegion') != None:
            queryset.RecRegion = request.POST.get('RecNRecRegioname')
        if request.POST.get('RecIDPlaceHolder') != None:
            queryset.RecIDPlaceHolder = request.POST.get('RecIDPlaceHolder')
        if request.POST.get('RecName') != None:
            queryset.RecName = request.POST.get('RecName')
        if request.POST.get('RecLongtitude') != None:
            queryset.RecLongtitude = request.POST.get('RecLongtitude')
        if request.POST.get('RecLatitude') != None:
            queryset.RecLatitude = request.POST.get('RecLatitude')
        if request.POST.get('RecPlaceOwner') != None:
            queryset.RecPlaceOwner = request.POST.get('RecPlaceOwner')
        if request.POST.get('RecPlaceUser') != None:
            queryset.RecPlaceUser = request.POST.get('RecPlaceUser')
        if request.POST.get('RecAltitude') != None:
            queryset.RecAltitude = request.POST.get('RecAltitude')
        if request.POST.get('RecAltitude_Ustie') != None:
            queryset.RecAltitude_Ustie = request.POST.get('RecAltitude_Ustie')
        if request.POST.get('RecElevation') != None:
            queryset.RecElevation = request.POST.get('RecElevation')
        if request.POST.get('RecType') != None:
            queryset.RecType = request.POST.get('RecType')
        queryset.save()
        return Response(RecID)
    
class Rock(ModelViewSet):
    queryset = CRock.objects.filter( RecID = 1 )
    serializer_class= RockSerializer
    http_method_names = ['delete', 'post', 'get', 'put','patch']
    
    def retrieve(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).retrieve(request)
        return Response({'key': 'single value'})

    def list(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).list(request)
        
        if self.request.GET.get('RecID') != None:            
            SearchRecID = self.request.GET.get('RecID')
            queryset = CRock.objects.filter( RecID = SearchRecID )
            return Response({'Result': [queryset.as_dict_withParentAndChild() for queryset in queryset], 'Status': 'OK'})
        else:
            SearchRecID = '-1'
            queryset = CRock.objects.all()
                
        return Response({'Result': [queryset.as_dict() for queryset in queryset], 'Status': 'OK'})
    
    def get_queryset(self):
        SearchRecID = self.request.GET.get('RecID')
        print(SearchRecID)
        if SearchRecID == '-1':
            queryset = CRock.objects.all()
        else:
            queryset = CRock.objects.filter( RecID = SearchRecID )
        return queryset
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        if request.POST.get('RecID') == '-1':
            queryset = queryset = CRock.objects.all()
        else:
            queryset = CRock.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
    @action(methods=['put'], detail=False)
    def put(self, request):
        RecID = request.POST.get('RecID')
        if RecID == None:
            return Response('-1')
        queryset = CRock.objects.filter( RecID = RecID )[0]
        if request.POST.get('RecWellID') != None:
            queryset.RecWellID = request.POST.get('RecWellID')
        if request.POST.get('RecTop') != None:
            queryset.RecTop = request.POST.get('RecTop')
        if request.POST.get('RecBottom') != None:
            queryset.RecBottom = request.POST.get('RecBottom')
        if request.POST.get('RecStep') != None:
            queryset.RecStep = request.POST.get('RecStep')
        queryset.save()
        return Response(RecID)
    
class RockResearch(ModelViewSet):
    queryset = CRockResearch.objects.filter( RecID = 1 )
    serializer_class= RockResearchSerializer
    http_method_names = ['delete', 'post', 'get', 'put','patch']
    
    def retrieve(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).retrieve(request)
        return Response({'key': 'single value'})

    def list(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).list(request)
        
        if self.request.GET.get('RecID') != None:            
            SearchRecID = self.request.GET.get('RecID')
            queryset = CRockResearch.objects.filter( RecID = SearchRecID )
            return Response({'Result': [queryset.as_dict_withParentAndChild() for queryset in queryset], 'Status': 'OK'})
        else:
            SearchRecID = '-1'
            queryset = CRockResearch.objects.all()
                
        return Response({'Result': [queryset.as_dict() for queryset in queryset], 'Status': 'OK'})
    
    def get_queryset(self):
        SearchRecID = self.request.GET.get('RecID')
        print(SearchRecID)
        if SearchRecID == '-1':
            queryset = CRockResearch.objects.all()
        else:
            queryset = CRockResearch.objects.filter( RecID = SearchRecID )
        return queryset
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        if request.POST.get('RecID') == '-1':
            queryset = CRockResearch.objects.all()
        else:
            queryset = CRockResearch.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
    @action(methods=['put'], detail=False)
    def put(self, request):
        RecID = request.POST.get('RecID')
        if RecID == None:
            return Response('-1')
        queryset = CRockResearch.objects.filter( RecID = RecID )[0]
        if request.POST.get('RecRockID') != None:
            queryset.RecRockID = request.POST.get('RecRockID')
        if request.POST.get('RecType') != None:
            queryset.RecType = request.POST.get('RecType')
        if request.POST.get('RecName') != None:
            queryset.RecName = request.POST.get('RecName')
        queryset.save()
        return Response(RecID)
    
class RockParamValue(ModelViewSet):
    queryset = CRockParamValue.objects.filter( RecID = 1 )
    serializer_class= RockParamValueSerializer
    http_method_names = ['delete', 'post', 'get', 'put','patch']
    
    def retrieve(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).retrieve(request)
        return Response({'key': 'single value'})

    def list(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).list(request)
        if self.request.GET.get('RecDictionaryPropertyID') != None:
            #query &= Q(RecDictionaryPropertyID=self.request.GET.get('RecDictionaryPropertyID'))
            
            DictionaryPropertyID = self.request.GET.get('RecDictionaryPropertyID')
            #print(DictionaryPropertyID)
            
            if self.request.GET.get('RecWellID') != None:
                # выборка по всем замерам для скважины
                WellID = self.request.GET.get('RecWellID')
                #print(10)
                well = CWell.objects.filter(RecID = WellID)[0]
                #print(well.as_dict_withParam(DictionaryPropertyID))
                #print(well.as_dict())
                return Response({'Result': well.as_dict_withParam(DictionaryPropertyID), 'Status': 'OK'}) #well.as_dict_withParam(DictionaryPropertyID)
            
            else:
                if self.request.GET.get('RecRockID') != None:
                    # выборка всех измерений по керну
                    print('Выбор по RecRockID')
                    RockID = self.request.GET.get('RecRockID')
                    rock = CRock.objects.filter(RecID = RockID)[0]
                    return Response({'Result': rock.as_dict_with_Param(DictionaryPropertyID), 'Status': 'OK'})
                else:
                    if self.request.GET.get('RecRockResearchID') != None:
                        # выборка всех значений для параметра по исследованию
                        print('Выбор по RecRockResearchID')
                        SearchID = self.request.GET.get('RecRockResearchID')
                        search = CRockResearch.objects.filter(RecID = SearchID)[0]
                        return Response({'Result': search.as_dict_withParam(DictionaryPropertyID), 'Status': 'OK'})
                    else:
                        # написать что данных для выбора не хватает
                        print('Data not enought')
                        return Response({'Result': 'Data not enought', 'Status': 'ERROR'})
        else:
            if self.request.GET.get('RecID') != None:            
                SearchRecID = self.request.GET.get('RecID')
                queryset = CRockParamValue.objects.filter( RecID = SearchRecID )
            else:
                SearchRecID = '-1'
                queryset = CRockParamValue.objects.all()
                
        return Response({'Result': [queryset.as_dict() for queryset in queryset]})
    
    def get_queryset(self):
        #query = Q()
        if self.request.GET.get('RecDictionaryPropertyID') != None:
            #query &= Q(RecDictionaryPropertyID=self.request.GET.get('RecDictionaryPropertyID'))
            
            DictionaryPropertyID = self.request.GET.get('RecDictionaryPropertyID')
            print(DictionaryPropertyID)
            wellDic = {}
            rocksDic = {}
            rocksSearchDic = {}
            valuesDic = {}
            if self.request.GET.get('RecWellID') != None:
                # выборка по всем замерам для скважины
                WellID = self.request.GET.get('RecWellID')
                print(10)
                well = CWell.objects.filter(RecID = WellID)[0]
                print(well.as_dict_withParam(DictionaryPropertyID))
                #print(well.as_dict())
                return Response({'test': 'test'}) #well.as_dict_withParam(DictionaryPropertyID)
            
            else:
                if self.request.GET.get('RecRockID') != None:
                    # выборка всех измерений по керну
                    print('Выбор по RecRockID')
                else:
                    if self.request.GET.get('RecRockResearchID') != None:
                        # выборка всех значений для параметра по исследованию
                        print('Выбор по RecRockResearchID')
                    else:
                        # написать что данных для выбора не хватает
                        print('Data not enought')
        else:
            if self.request.GET.get('RecID') != None:            
                SearchRecID = self.request.GET.get('RecID')
                queryset = CRockParamValue.objects.filter( RecID = SearchRecID )
            else:
                SearchRecID = '-1'
                queryset = CRockParamValue.objects.all()
                
        return queryset
         
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        if request.POST.get('RecRockResearchID') != None:
            queryset = CRockParamValue.objects.filter( RecRockResearchID = request.POST.get('RecRockResearchID') )
        else:
            if request.POST.get('RecID') == '-1':
                queryset = CRockParamValue.objects.all()
            else:
                queryset = CRockParamValue.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
    @action(methods=['put'], detail=False)
    def put(self, request):
        RecID = request.POST.get('RecID')
        if RecID == None:
            return Response('-1')
        queryset = CRockParamValue.objects.filter( RecID = RecID )[0]
        if request.POST.get('RecRockResearchID') != None:
            queryset.RecRockResearchID = request.POST.get('RecRockResearchID')
        if request.POST.get('RecDictionaryPropertyID') != None:
            queryset.RecDictionaryPropertyID = request.POST.get('RecDictionaryPropertyID')
        if request.POST.get('RecDepth') != None:
            queryset.RecDepth = request.POST.get('RecDepth')
        if request.POST.get('RecValue') != None:
            queryset.RecValue = request.POST.get('RecValue')
        queryset.save()
        return Response(RecID)
    
class FileUpload(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = UploadedFileSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            file = serializer.validated_data["RecFile"]
            print(file.name)
            file_name, file_extension = os.path.splitext(file.name)
            print(file_name, ' -> ', file_extension)
            if (file_extension == '.las'):
                CurrentSection = ''
                versionLAS = '0.0'
                wrap = 'NO'
                dlm = 'SPACE'
                ind = 0
                #well = CWell()
                #rock = CRock()
                #rockResearch = CRockResearch()
                valNull = ''
                dic = {}
                curvDic = {}
                while True:
                    line = file.readline().decode("utf-8").strip()
                    if not line:
                        break
                    if line[0] == '#':
                        continue

                    if line[0] == '~':

                        if line[0:2].lower() != CurrentSection:
                            #делаем сохранение данных
                            if CurrentSection == '~w':
                                #print('try to search ->', dic['well'][1])
                                try:
                                    well = CWell.objects.filter(RecName = dic['well'][1])
                                    wellID = well[0].RecID
                                except:
                                #    print('cant find lets create')
                                    well = CWell()
                                    well.RecName = dic['well'][1]
                                    well.RecPlaceUser = dic['srvc'][1]
                                    #well.RecPlaceUser = dic['srvc'][1]
                                    try:
                                #        print('try to find db_PlaceHolder ->', dic['fld'][1])
                                        ph = db_PlaceHolder.objects.filter(RecName = dic['fld'][1])
                                        phID = ph[0].RecID
                                    except:
                                #        print('cant find db_PlaceHolder, lets create')
                                        ph = db_PlaceHolder()
                                        ph.RecName = dic['fld'][1]
                                        ph = ph.save()
                                        phID = ph.RecID
                                #    print('phID ->', phID)
                                    well.RecIDPlaceHolder = phID
                                    well.RecPlaceOwner = dic['comp'][1]
                                    well.save()
                                    wellID = well.RecID

                                try:
                                #    print('PlaceHolder, lets find RecWellID ->', wellID)
                                    rock = CRock.objects.filter(RecWellID = wellID, RecTop = float(dic['strt'][1]), RecBottom = float(dic['stop'][1]))
                                    rockID = rock[0].RecID
                                except:
                                #    print('cant find CRock, lets create')
                                    rock = CRock()
                                    rock.RecWellID = wellID
                                    rock.RecTop = float(dic['strt'][1])
                                    rock.RecBottom = float(dic['stop'][1])
                                    rock.save()
                                    rockID = rock.RecID

                                #print ('rockID ->',rockID)
                                rockResearch = CRockResearch()
                                rockResearch.RecRockID = rockID
                                rockResearch.RecType = 'D'
                                rockResearch.RecName = file.name
                                rockResearch.RecStep = float(dic['step'][1])
                                #now = datetime.now()
                                rockResearch.RecDT = datetime.now().timestamp()
                                rockResearch.save()
                                rockResearchID = rockResearch.RecID

                            if CurrentSection == '~p':
                                print('we see param section')

                            if CurrentSection == '~c': 
                                print('we see curve section')
                                curvDic = dic.copy()
                                print('curvDic -> ')
                                print(curvDic)
                                print(' <- curvDic')
                            dic.clear()

                        CurrentSection = line[0:2].lower()  
                        continue
                    if CurrentSection == '~v':
                        name, unit, value, descr = ParseLine(' ', line)
                    if CurrentSection == '~w':
                        name, unit, value, descr = ParseLine(' ', line)
                        if name == 'NULL':
                            valNull = value
                        dic[name.lower()] = [unit.lower(), value.lower(), descr.lower()]
                    if CurrentSection == '~p':
                        name, unit, value, descr = ParseLine(' ', line)
                        dic[name.lower()] = [unit.lower(), value.lower(), descr.lower()]
                    if CurrentSection == '~c':
                        name, unit, value, descr = ParseLine(' ', line)
                        # найдем соответствующий ИД для параметра, либо создадим
                        try:
                            dicProp = CDictionaryProperty.objects.filter(RecSymbols = name.lower())
                            dicPropID = dicProp[0].RecID
                        except:
                            dicProp = CDictionaryProperty()
                            dicProp.RecSymbols = name.lower()
                            dicProp.RecUnit = unit.lower()
                            dicProp.RecDescr = descr.lower()
                            dicProp.save()
                            dicPropID = dicProp.RecID
                        dic[name.lower()] = [unit.lower(), value.lower(), descr.lower(), dicPropID]
                    if CurrentSection == '~a':
                        print('i ->',ind, ', section Ascii')
                        #сразу разгребаем на основе словоря curvDic
                        listValLine = ParseAscii(line)
                        #print(line)
                        #print(' -> ')
                        #print(listValLine)

                        #print(len(listValLine), ' -> ', len(curvDic))
                        listParams = list(curvDic.values())
                        for i in range(len(listValLine)):
                            if i == 0:
                                continue
                            try:
                                #print(listParams[i], ' -> ', listValLine[i])
                                # rockResearchID
                                # dicPropID
                                rockParamValue = CRockParamValue()
                                rockParamValue.RecRockResearchID = rockResearchID
                                rockParamValue.RecDictionaryPropertyID = listParams[i][3]
                                rockParamValue.RecDepth = listValLine[0]
                                rockParamValue.RecValue = listValLine[i]
                                rockParamValue.save()
                            except Exception as ex:
                                print(ex)
                                print(listValLine[i], ' at index ', i, ' not find')


                    #print('type -> ', CurrentSection)
                    #print('name -> ', name)
                    #print('unit -> ', unit)
                    #print('value -> ', value)
                    #print('descr -> ', descr)

                    #line = line.strip().replace(' ','')
                    #print(line)
                    if ind == 177:
                        break
                    ind = ind + 1

                #print(curvDic)

                serializer.save()
                file.close()
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED
                )
            if (file_extension == '.csv'):
                print('start analize csv')
                wrapper = csv.reader(codecs.iterdecode(file, 'utf-8'))
                ind = 0
                rockResearchID = -1
                wellNameInd = -1
                param = []
                fields = {}
                isFirst = True
                depth = -1
                minDepth = 100000
                maxDepth = 0
                for line in wrapper:
                    #print(line)
                    #print(len(line))
                    if ind == 0:
                        # перед нами загловок
                        indField = 0
                        for elem in line:
                            dicID_E = -1
                            if elem.lower().find('well') == -1:
                                if elem.lower().find('dataset') != -1:
                                    print('dataset num')
                                #перед нами набор данных
                                else:
                                    try:
                                        dicProp = CDictionaryProperty.objects.filter(RecSymbols = elem.lower())
                                        dicPropID = dicProp[0].RecID
                                    except:
                                        dicProp = CDictionaryProperty()
                                        dicProp.RecSymbols = elem.lower()
                                        dicProp.RecUnit = ''
                                        dicProp.RecDescr = elem.lower()
                                        dicProp.save()
                                        dicPropID = dicProp.RecID
                                    dicID_E = dicPropID
                                
                            else:
                                #перед нами номер well и надо сделать сохранение
                                print('well')
                                wellNameInd = indField
                                
                            indField = indField + 1

                            #param.append(elem)
                            param.append(dicID_E)
                        ind = ind + 1
                        continue
                    if line[0] == '':
                        ind = ind + 1
                        continue
                    indElem = 0
                    isFirst = True
                    for elem in line:
                        if param[indElem] != -1:
                            if isFirst == True:
                                depth = float(elem)
                                isFirst = False
                            else:
                                print(param[indElem], ' -> ', elem, ' -> ', depth)
                                try:
                                    #print(listParams[i], ' -> ', listValLine[i])
                                    # rockResearchID
                                    # dicPropID
                                    rockParamValue = CRockParamValue()
                                    rockParamValue.RecRockResearchID = rockResearchID
                                    rockParamValue.RecDictionaryPropertyID = int(param[indElem])
                                    rockParamValue.RecDepth = depth
                                    rockParamValue.RecValue = float(elem)
                                    rockParamValue.save()
                                    if minDepth > depth:
                                        minDepth = depth
                                    if maxDepth < depth:
                                        maxDepth = depth
                                except Exception as ex:
                                    print(ex)
                                    print(listValLine[i], ' at index ', i, ' not find')
                        else:
                            if rockResearchID == -1:
                                if indElem == wellNameInd:
                                    try:
                                        well = CWell.objects.filter(RecName = elem)
                                        wellID = well[0].RecID
                                    except:
                                    #    print('cant find lets create')
                                        well = CWell()
                                        well.RecName = elem
                                        well.RecPlaceUser = ''
                                        #well.RecPlaceUser = dic['srvc'][1]
                                        try:
                                    #        print('try to find db_PlaceHolder ->', dic['fld'][1])
                                            ph = db_PlaceHolder.objects.filter(RecName = '')
                                            phID = ph[0].RecID
                                        except:
                                    #        print('cant find db_PlaceHolder, lets create')
                                            ph = db_PlaceHolder()
                                            ph.RecName = ''
                                            ph.save()
                                            phID = ph.RecID
                                    #    print('phID ->', phID)
                                        well.RecIDPlaceHolder = phID
                                        well.RecPlaceOwner = ''
                                        well.save()
                                        wellID = well.RecID

                                    try:
                                    #    print('PlaceHolder, lets find RecWellID ->', wellID)
                                        rock = CRock.objects.filter(RecWellID = wellID, RecTop = float(0), RecBottom = float(0))
                                        rockID = rock[0].RecID
                                    except:
                                    #    print('cant find CRock, lets create')
                                        rock = CRock()
                                        rock.RecWellID = wellID
                                        rock.RecTop = 0
                                        rock.RecBottom = 0
                                        rock.save()
                                        rockID = rock.RecID

                                    #print ('rockID ->',rockID)
                                    rockResearch = CRockResearch()
                                    rockResearch.RecRockID = rockID
                                    rockResearch.RecType = 'D'
                                    rockResearch.RecName = file.name
                                    rockResearch.RecStep = float(0)
                                    #now = datetime.now()
                                    rockResearch.RecDT = datetime.now().timestamp()
                                    rockResearch.save()
                                    rockResearchID = rockResearch.RecID
                            
                        
                        indElem = indElem + 1
                    ind = ind + 1
                rock.RecTop = minDepth
                rock.RecBottom = maxDepth
                rock.save()
                
                serializer.save()
                file.close()
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED
                )
        print(serializer.errors)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )   
class Zone(ModelViewSet):
    queryset = CZone.objects.filter( RecID = 1 )
    serializer_class= ZoneSerializer
    http_method_names = ['delete', 'post', 'get']
    
    def get_queryset(self):
        SearchRecID = self.request.GET.get('RecID')
        print(SearchRecID)
        if SearchRecID == '-1':
            queryset = CZone.objects.all()
        else:
            queryset = CZone.objects.filter( RecID = SearchRecID )
        return queryset
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        queryset = CZone.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
class FormulaVariables(ModelViewSet):
    queryset = CFormulaVariables.objects.filter( RecID = 1 )
    serializer_class= FormulaVariablesSerializer
    http_method_names = ['delete', 'post', 'get', 'put','patch']
    
    def retrieve(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).retrieve(request)
        return Response({'key': 'single value'})

    def list(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).list(request)
        if self.request.GET.get('RecID') != None:            
            SearchRecID = self.request.GET.get('RecID')
            queryset = CFormulaVariables.objects.filter( RecID = SearchRecID )
        else:
            SearchRecID = '-1'
            queryset = CFormulaVariables.objects.all()
                
        return Response({'Result': [queryset.as_dict() for queryset in queryset]})
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        queryset = CFormulaVariables.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
class Calculation(ModelViewSet):
    queryset = CCalculation.objects.filter( RecID = 1 )
    serializer_class= CalculationSerializer
    http_method_names = ['delete', 'post', 'get', 'put','patch']
    
    def retrieve(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).retrieve(request)
        return Response({'key': 'single value'})

    def list(self, request, *args, **kwargs):
        # ret = super(StoryViewSet, self).list(request)
        if self.request.GET.get('RecID') != None:            
            SearchRecID = self.request.GET.get('RecID')
            queryset = CCalculation.objects.filter( RecID = SearchRecID )
        else:
            SearchRecID = '-1'
            queryset = CCalculation.objects.all()
                
        return Response({'Result': [queryset.as_dict() for queryset in queryset]})
    
    @action(methods=['delete'], detail=False)
    def delete(self, request):
        queryset = CCalculation.objects.filter( RecID = request.POST.get('RecID') )
        queryset.delete()
        return Response(request.POST.get('RecID'))
    
    @action(methods=['patch'], detail=False)
    def patch(self, request):
        recID = request.POST.get('RecID')
        print('patch -> Calculation, RecID ->', recID)
        calc = CCalculation.objects.get(RecID = recID)
        if calc == None:
            return Response({'Method': 'CalcByFormula', 'status': 'ERROR', 'Descr': 'with recID record not found', 'Details': {'RecID': recID}})
        if request.POST.get('WellID') == None:
            return Response({'Method': 'CalcByFormula', 'status': 'ERROR', 'Descr': 'WellID is not accessible', 'Details': {'RecID': recID}})
        wellID = request.POST.get('WellID')
        print('patch -> Calculation, wellID ->', wellID)
        recCalc = calc.TryCalc(wellID)
        recCalcRes = []
        for recalc in recCalc:
            resRec = {}
            resRec['depth'] = recalc
            resRec['value'] = recCalc[recalc]
            recCalcRes.append(resRec)
        #print(recCalc)
        return Response({'Method': 'CalcByFormula', 'status': 'OK', 'Descr': 'formula -> '+calc.RecFormula+', wellID -> '+wellID, 'Result': recCalcRes})
    
class LetsCalc (ModelViewSet):
    queryset = CCalculation.objects.filter( RecID = 1 )
    serializer_class= CalculationSerializer
    http_method_names = ['get']