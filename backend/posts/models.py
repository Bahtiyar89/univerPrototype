from django.db import models

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
    
class CDictionaryProperty (models.Model):                   #Словарь свойств
    RecID = models.AutoField(primary_key=True)
    RecSymbols = models.CharField(max_length=40)            #аналог Variable для техлога
    RecDescr = models.CharField(max_length=50)
    RecFamilyID = models.IntegerField(default = -1)         #привязка к family
    RecUnit = models.CharField(max_length=10)
    
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
    
class CRock (models.Model):
    RecID = models.AutoField(primary_key=True)
    RecWellID = models.IntegerField(default = -1)    #привязка к скважине
    RecTop = models.FloatField(default = -1)
    RecBottom = models.FloatField(default = -1)
    
    
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
    
    
class CRockParamValue (models.Model):
    RecID = models.BigAutoField(primary_key=True)
    RecRockResearchID = models.IntegerField(default = -1)    #привязка к исследованию
    RecDictionaryPropertyID = models.IntegerField(default = -1)    #привязка к словарю свойств
    RecDepth = models.FloatField(default = -1)                      #Глубина
    RecValue = models.FloatField(default = -1)                      #значение параметра из словоря к указанной глубине
    
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