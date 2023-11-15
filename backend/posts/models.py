from django.db import models

from django.core.serializers import serialize
import json

# Create your models here.

class Post(models.Model):
    title=models.CharField(max_length=200)
    body=models.TextField()

    def __str__(self):
        return f"Post: {self.title}"
    
class CParentFamily(models.Model):
    RecID = models.AutoField(primary_key=True)
    RecName = models.CharField(max_length=100)
    
class CFamily(models.Model):
    RecID = models.AutoField(primary_key=True)
    RecParentFamilyID = models.IntegerField(default = -1)   #привязка к ParentFamily
    RecName = models.CharField(max_length=50, null=False)
    RecMin = models.FloatField(default = 0, null=True)
    RecMax = models.FloatField(default = 0, null=True)
    RecLimitInf = models.FloatField(default = 0, null=True)
    RecLimitSup = models.FloatField(default = 0, null=True)
    RecScale = models.CharField(max_length=40, null=True)
    RecColorLogview = models.CharField(max_length=40, null=True)
    RecColorTechlog = models.CharField(max_length=40, null=True)
    RecColorTrack = models.CharField(max_length=40, null=True)
    RecType = models.CharField(max_length=40, null=True)
    RecLineType = models.IntegerField(default = 0, null=True)
    RecThickness = models.IntegerField(default = 0, null=True)
    RecMarkerDisplay = models.CharField(max_length=40, null=True)
    RecMarkerType = models.CharField(max_length=40, null=True)
    RecMarkerSize = models.CharField(max_length=40, null=True)
    RecWrapDisplay	 = models.CharField(max_length=40, null=True)
    RecWrapFact	 = models.CharField(max_length=40, null=True)
    RecWrapColor	 = models.CharField(max_length=40, null=True)
    RecWrapThickness	 = models.CharField(max_length=40, null=True)
    RecFillType	 = models.CharField(max_length=40, null=True)
    RecPalette	 = models.CharField(max_length=40, null=True)
    RecColor1	 = models.CharField(max_length=40, null=True)
    RecColor2	 = models.CharField(max_length=40, null=True)
    RecBicolorType	 = models.CharField(max_length=40, null=True)
    RecFillTo	 = models.CharField(max_length=40, null=True)
    RecBaselineValue	 = models.CharField(max_length=40, null=True)
    RecBaselineThickness	 = models.CharField(max_length=40, null=True)
    RecBaselineColor	 = models.CharField(max_length=40, null=True)
    RecNbRepetitions	 = models.CharField(max_length=40, null=True)
    RecNbVerticalLinesOnGrid	 = models.CharField(max_length=40, null=True)
    RecColorFirstColumn	 = models.CharField(max_length=40, null=True)
    RecColorLog	 = models.CharField(max_length=40, null=True)
    RecColorLastColumn = models.CharField(max_length=40, null=True)
    
    def as_dict(self):
        return {
            'RecID': self.RecID
            ,'RecParentFamilyID': self.RecParentFamilyID
            ,'RecName': self.RecName
            ,'RecMin': self.RecMin
            ,'RecMax': self.RecMax
            ,'RecLimitInf': self.RecLimitInf
            ,'RecLimitSup': self.RecLimitSup
            ,'RecScale': self.RecScale
            ,'RecColorLogview': self.RecColorLogview
            ,'RecColorTechlog': self.RecColorTechlog
            ,'RecColorTrack': self.RecColorTrack
            ,'RecType': self.RecType
            ,'RecLineType': self.RecLineType
            ,'RecThickness': self.RecThickness
            ,'RecMarkerDisplay': self.RecMarkerDisplay
            ,'RecMarkerType': self.RecMarkerType
            ,'RecMarkerSize': self.RecMarkerSize
            ,'RecWrapDisplay': self.RecWrapDisplay
            ,'RecWrapFact': self.RecWrapFact
            ,'RecWrapColor': self.RecWrapColor
            ,'RecWrapThickness': self.RecWrapThickness
            ,'RecFillType': self.RecFillType
            ,'RecPalette': self.RecPalette
            ,'RecColor1': self.RecColor1
            ,'RecColor2': self.RecColor2
            ,'RecBicolorType': self.RecBicolorType
            ,'RecFillTo': self.RecFillTo
            ,'RecBaselineValue': self.RecBaselineValue
            ,'RecBaselineThickness': self.RecBaselineThickness
            ,'RecBaselineColor': self.RecBaselineColor
            ,'RecNbRepetitions': self.RecNbRepetitions
            ,'RecNbVerticalLinesOnGrid': self.RecNbVerticalLinesOnGrid
            ,'RecColorFirstColumn': self.RecColorFirstColumn
            ,'RecColorLog': self.RecColorLog
            ,'RecColorLastColumn': self.RecColorLastColumn
        }
    
class CDictionaryProperty (models.Model):                   #Словарь свойств
    RecID = models.AutoField(primary_key=True)
    RecSymbols = models.CharField(max_length=40)            #аналог Variable для техлога
    RecDescr = models.CharField(max_length=50)
    RecFamilyID = models.IntegerField(default = -1)         #привязка к family
    RecUnit = models.CharField(max_length=10)
    
    def as_dict(self):
        fam = CFamily.objects.filter(RecID = self.RecFamilyID)
        return {
            'RecID': self.RecID
            ,'RecSymbols': self.RecSymbols
            ,'RecDescr': self.RecDescr
            ,'RecFamilyID': self.RecFamilyID
            ,'RecUnit': self.RecUnit
            
            
            ,'Family': [fam.as_dict() for fam in fam]
        }
    
class PlaceHolder (models.Model):                           #месторождение
    RecID = models.AutoField(primary_key=True)
    RecName = models.CharField(max_length=50)
    
class CWell (models.Model):                                 #Скважина
    
    Type_Var = [
        ("H", "Горизонтальная"),
        ("V", "Вертикальная"),
        ("N", "Наклонная"),
    ]
    
    RecID = models.AutoField(primary_key=True)
    RecCountry = models.CharField(max_length=50)
    RecRegion = models.CharField(max_length=100)
    RecIDPlaceHolder = models.IntegerField(default = -1)    #привязка к месторождению
    RecName = models.CharField(max_length=100)
    RecLongtitude = models.FloatField(default = 0)
    RecLatitude = models.FloatField(default = 0)
    RecPlaceOwner = models.CharField(max_length=100)        #недропользователь
    RecPlaceUser = models.CharField(max_length=100)         #компания оператор
    RecAltitude = models.FloatField(default = 0)            #альтитуда
    RecAltitude_Ustie = models.FloatField(default = 0)      #альтитуда устья
    RecElevation = models.FloatField(default = 0)
    RecType = models.CharField(max_length=1, choices=Type_Var)
    
    @property
    def Rocks(self):
        rocks = CRock.objects.filter(RecWellID = self.RecID)
        return [rocks.as_dict() for rocks in rocks]
    
    def as_dict(self):
        return {
            'RecID': self.RecID
            ,'RecCountry': self.RecCountry
            ,'RecRegion': self.RecRegion
            ,'RecIDPlaceHolder': self.RecIDPlaceHolder
            ,'RecName': self.RecName
            ,'RecLongtitude': self.RecLongtitude
            ,'RecLatitude': self.RecLatitude
            ,'RecPlaceOwner': self.RecPlaceOwner
            ,'RecPlaceUser': self.RecPlaceUser
            ,'RecAltitude': self.RecAltitude
            ,'RecAltitude_Ustie': self.RecAltitude_Ustie
            ,'RecElevation': self.RecElevation
            ,'RecType': self.RecType
            ,'Rocks': self.Rocks
        }
    
    def as_dict_withParam(self, paramID):
        rocks = CRock.objects.filter(RecWellID = self.RecID)
        return {
            'RecID': self.RecID
            ,'RecCountry': self.RecCountry
            ,'RecRegion': self.RecRegion
            ,'RecIDPlaceHolder': self.RecIDPlaceHolder
            ,'RecName': self.RecName
            ,'RecLongtitude': self.RecLongtitude
            ,'RecLatitude': self.RecLatitude
            ,'RecPlaceOwner': self.RecPlaceOwner
            ,'RecPlaceUser': self.RecPlaceUser
            ,'RecAltitude': self.RecAltitude
            ,'RecAltitude_Ustie': self.RecAltitude_Ustie
            ,'RecElevation': self.RecElevation
            ,'RecType': self.RecType
            ,'Rocks': [rocks.as_dict_with_Param(paramID) for rocks in rocks]
        }
    
    def as_dict_withParentAndChild(self):
        rock = CRock.objects.filter(RecWellID = self.RecID)
        if rock != None:
            search = CRockResearch.objects.filter(RecRockID = rock.RecID)
        return {
            'RecID': self.RecID
            ,'RecCountry': self.RecCountry
            ,'RecRegion': self.RecRegion
            ,'RecIDPlaceHolder': self.RecIDPlaceHolder
            ,'RecName': self.RecName
            ,'RecLongtitude': self.RecLongtitude
            ,'RecLatitude': self.RecLatitude
            ,'RecPlaceOwner': self.RecPlaceOwner
            ,'RecPlaceUser': self.RecPlaceUser
            ,'RecAltitude': self.RecAltitude
            ,'RecAltitude_Ustie': self.RecAltitude_Ustie
            ,'RecElevation': self.RecElevation
            ,'RecType': self.RecType
            
            ,'Rock': [rock.as_dict() for rock in rock] if rock != None else ['Not Data']
            ,'Search': [search.as_dict() for search in search] if search != None else ['Not Data']
        }
    
    def GetValuesForParameter(self, paramID):
        rocks = CRock.objects.filter(RecWellID = self.RecID)
        print([rocks.as_dict_with_Param(paramID) for rocks in rocks])
        return [rocks.as_dict_with_Param(paramID) for rocks in rocks]
    
class CRock (models.Model):
    RecID = models.AutoField(primary_key=True)
    RecWellID = models.IntegerField(default = -1)    #привязка к скважине
    RecTop = models.FloatField(default = -1)
    RecBottom = models.FloatField(default = -1)
    #Well = models.ForeignKey(CWell, on_delete=models. CASCADE)
    
    @property
    def Searches(self):
        searches = CRockResearch.objects.filter(RecRockID = self.RecID)
        return [searches.as_dict() for searches in searches]
        
    def as_dict(self):
        searches = CRockResearch.objects.filter(RecRockID = self.RecID)
        return {
            'RecID': self.RecID
            ,'RecWellID': self.RecWellID
            ,'RecTop': self.RecTop
            ,'RecBottom': self.RecBottom
            
            
            ,'Searches': [searches.as_dict() for searches in searches]
        }
    
    def as_dict_with_Param(self, paramID):
        searches = CRockResearch.objects.filter(RecRockID = self.RecID)
        return {
            'RecID': self.RecID
            ,'RecWellID': self.RecWellID
            ,'RecTop': self.RecTop
            ,'RecBottom': self.RecBottom
            ,'Searches': [searches.as_dict_withParam(paramID) for searches in searches]
        }
    
    def as_dict_withParentAndChild(self):
        well = CWell.objects.get(RecID = self.RecWellID)
        searches = CRockResearch.objects.filter(RecRockID = self.RecID)
        return {
            'RecID': self.RecID
            ,'RecWellID': self.RecWellID
            ,'RecTop': self.RecTop
            ,'RecBottom': self.RecBottom
            ,'Well': well.as_dict()
            ,'Searches': [searches.as_dict() for searches in searches]
        }
    
    
class CRockResearch (models.Model):
    
    Type_Var = [
        ("D", "DataSet"),
        ("K", "Данные по керну"),
        ("S", "Стратиграфия"),
        ("R", "Траектория"),
    ]
    
    RecID = models.BigAutoField(primary_key=True)
    RecDT = models.IntegerField(default = -1)    #время записи в UnixTime
    RecRockID = models.IntegerField(default = -1)    #привязка к Керну
    RecType = models.CharField(max_length=1, choices=Type_Var)
    RecName = models.CharField(max_length=100)
    RecStep = models.FloatField(default = -1)
    
    def as_dict_withParam(self, paramID):
        values = CRockParamValue.objects.filter(RecRockResearchID = self.RecID, RecDictionaryPropertyID = paramID)
        param = CDictionaryProperty.objects.get(RecID = paramID)
        return {
            'RecID': self.RecID
            ,'RecDT': self.RecDT
            ,'RecRockID': self.RecRockID
            ,'RecType': self.RecType
            ,'RecName': self.RecName
            ,'RecStep': self.RecStep
            ,'param': param.as_dict()
            ,'values': [values.as_dict() for values in values]
        }

    def as_dict(self):
        return {
            'RecID': self.RecID
            ,'RecDT': self.RecDT
            ,'RecRockID': self.RecRockID
            ,'RecType': self.RecType
            ,'RecName': self.RecName
            ,'RecStep': self.RecStep
            #,'Searches': [Searches.as_dict() for Searches in Searchs]
        }
    
    def as_dict_withParentAndChild(self):
        rock = CRock.objects.get(RecID = self.RecRockID)
        if rock != None:
            well = CWell.objects.get(RecID = rock.RecWellID)
        return {
            'RecID': self.RecID
            ,'RecDT': self.RecDT
            ,'RecRockID': self.RecRockID
            ,'RecType': self.RecType
            ,'RecName': self.RecName
            ,'RecStep': self.RecStep
            #,'Searches': [Searches.as_dict() for Searches in Searchs]
            ,'Rock': rock.as_dict() if rock != None else ['Not data']
            ,'Well': well.as_dict() if well != None else ['Not data']
        }
    
class CRockParamValue (models.Model):
    RecID = models.BigAutoField(primary_key=True)
    RecRockResearchID = models.IntegerField(default = -1)    #привязка к исследованию
    RecDictionaryPropertyID = models.IntegerField(default = -1)    #привязка к словарю свойств
    RecDepth = models.FloatField(default = -1)                      #Глубина
    RecValue = models.FloatField(default = -1)                      #значение параметра из словоря к указанной глубине
    
    def as_dict(self):
        return {
            'RecID': self.RecID
            ,'RecRockResearchID': self.RecRockResearchID
            ,'RecDictionaryPropertyID': self.RecDictionaryPropertyID
            ,'RecDepth': self.RecDepth
            ,'RecValue': self.RecValue
        }
    
class CUploadedFile(models.Model):
    RecID = models.BigAutoField(primary_key=True)
    RecFile = models.FileField()
    RecUploaded_on = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.RecUploaded_on.date()

class CAllias(models.Model):
    RecID = models.BigAutoField(primary_key=True)
    RecAllias = models.CharField(max_length=100)
    RecTable = models.CharField(max_length=30)
    RecField = models.CharField(max_length=40)