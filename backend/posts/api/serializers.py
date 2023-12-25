from rest_framework.serializers import ModelSerializer
from ..models import *

from rest_framework.decorators import api_view

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields=('id', 'title', "body")
        
class PlaceHolderSerializer(ModelSerializer):
    class Meta:
        model = PlaceHolder
        fields=('RecID', 'RecName')
    def create (self, validated_data):
        print(validated_data)
        return PlaceHolder.objects.create(**validated_data)
    #def update (self, instance, validated_data):
    #    print(instance)
    
class ParentFamilySerializer(ModelSerializer):
    class Meta:
        model = PlaceHolder
        fields=('RecID', 'RecName')
    def create (self, validated_data):
        print(validated_data)
        return CParentFamily.objects.create(**validated_data)
    #def update (self, instance, validated_data):
    #    print(instance)
    
class DictionaryPropertySerializer(ModelSerializer):
    class Meta:
        model = CDictionaryProperty
        fields=('RecID', 'RecSymbols','RecDescr', 'RecFamilyID', 'RecUnit')
    def create (self, validated_data):
        print(validated_data)
        return CDictionaryProperty.objects.create(**validated_data)
    #def update (self, instance, validated_data):
    #    print(instance)
    
class WellSerializer(ModelSerializer):
    class Meta:
        model = CWell
        fields=('RecID'
                ,'RecCountry'
                ,'RecRegion'
                ,'RecIDPlaceHolder'
                ,'RecName'
                ,'RecLongtitude'
                ,'RecLatitude'
                ,'RecPlaceOwner'
                ,'RecPlaceUser'
                ,'RecAltitude'
                ,'RecAltitude_Ustie'
                ,'RecElevation'
                ,'RecType'
                ,'Rocks'
               )
    def create (self, validated_data):
        print(validated_data)
        return CWell.objects.create(**validated_data)
    #def update (self, instance, validated_data):
    #    print(instance)
    
class FamilySerializer(ModelSerializer):
    class Meta:
        model = CFamily
        fields=('RecID'
                ,'RecParentFamilyID'
                ,'RecName'
                ,'RecMin'
                ,'RecMax'
                ,'RecLimitInf'
                ,'RecLimitSup'
                ,'RecScale'
                ,'RecColorLogview'
                ,'RecColorTechlog'
                ,'RecColorTrack'
                ,'RecType'
                ,'RecLineType'
                ,'RecThickness'
                ,'RecMarkerDisplay'
                ,'RecMarkerType'
                ,'RecMarkerSize'
                ,'RecWrapDisplay'
                ,'RecWrapFact'
                ,'RecWrapColor'
                ,'RecWrapThickness'
                ,'RecFillType'
                ,'RecPalette'
                ,'RecColor1'
                ,'RecColor2'
                ,'RecFillTo'
                ,'RecBaselineValue'
                ,'RecBaselineThickness'
                ,'RecBaselineColor'
                ,'RecNbRepetitions'
                ,'RecNbVerticalLinesOnGrid'
                ,'RecColorFirstColumn'
                ,'RecColorLog'
                ,'RecColorLastColumn'
               )
    def create (self, validated_data):
        RecID = validated_data.get('RecID', None)
        print(RecID)
        print(validated_data)
        if RecID == None :
            return CFamily.objects.create(**validated_data)
        else:
            return CFamily.objects.get(RecID = RecID).update(
                RecName = validated_data.get('RecName', None)
            )
    def update (self, instance, validated_data):
        print(instance)
        print(validated_data)
        return instance
    
class RockSerializer(ModelSerializer):
    class Meta:
        model = CRock
        fields=('RecID'
                ,'RecWellID'
                ,'RecTop'
                ,'RecBottom'
                ,'Searches'
                #,'RecStep'
                #,'Well'
               )
    def create (self, validated_data):
        print(validated_data)
        return CRock.objects.create(**validated_data)
class RockResearchSerializer(ModelSerializer):
    class Meta:
        model = CRockResearch
        fields=('RecID'
                ,'RecDT'
                ,'RecRockID'
                ,'RecType'
                ,'RecName'
               )
    def create (self, validated_data):
        print(validated_data)
        return CRockResearch.objects.create(**validated_data)
class RockParamValueSerializer(ModelSerializer):
    class Meta:
        model = CRockParamValue
        fields=('RecID'
                ,'RecRockResearchID'
                ,'RecDictionaryPropertyID'
                ,'RecDepth'
                ,'RecValue'
               )
    def create (self, validated_data):
        print(validated_data)
        return CRockParamValue.objects.create(**validated_data)
    
class UploadedFileSerializer(ModelSerializer):
    class Meta:
        model = CUploadedFile
        fields = ('RecID', 'RecFile', 'RecUploaded_on',)
        
class ZoneSerializer(ModelSerializer):
    class Meta:
        model = CZone
        fields=('RecID', 'RecName', 'RecDepthStart', 'RecDepthfinish', 'RecDefaultColor')
    def create (self, validated_data):
        print(validated_data)
        return CZone.objects.create(**validated_data)
    #def update (self, instance, validated_data):
    #    print(instance)
    
class CalculationSerializer(ModelSerializer):
    class Meta:
        model = CCalculation
        fields=('RecID'
                ,'RecFormula'
               )
    def create (self, validated_data):
        print(validated_data)
        return CCalculation.objects.create(**validated_data)
    
class FormulaVariablesSerializer(ModelSerializer):
    class Meta:
        model = CFormulaVariables
        fields=('RecID'
                ,'RecFormulaID'
                ,'RecVariable'
                ,'RecDictionaryPropertyID'
                ,'RecDescription'
               )
    def create (self, validated_data):
        print(validated_data)
        return CFormulaVariables.objects.create(**validated_data)