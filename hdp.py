import turicreate as gl
import sys
from math import floor
from matplotlib import pyplot as plt
import seaborn as sns
import warnings
import pickle5 as pickle
warnings.filterwarnings('ignore')
heart=gl.SFrame("heartBNG.csv")
def age_modifier(x):
    return floor(x) 


def sex_modifier(x):
    if(x=="male"):
        return 1
    else:
        return 0
    
    
def cp_modifier(x):
    if(x=="typ_angina"):
        return 1
    elif(x=="atyp_angina"):
        return 2
    elif(x=="non_anginal"):
        return 3
    else:
        return 4
    
def fbs_modifier(x):
    if(x=='t'):
        return 1
    else:
        return 0
    
def restecg_modifier(x):
    if(x=="st_t_wave_abnormality"):
        return 1
    elif(x=="left_vent_hyper"):
        return 2
    else:
        return 0
    
def exang_modifier(x):
    if(x=="yes"):
        return 1
    else:
        return 0
    
def slope_modifier(x):
    if(x=="flat"):
        return 2
    elif(x=="up"):
        return 1
    else:
        return 3
    
def thal_modifier(x):
    if(x=="normal"):
        return 3
    elif(x=="fixed_defect"):
        return 6
    else:
        return 7
    
def num_modifier(x):
    if(x=='<50'):
        return 0
    else:
        return 1
heart['age']=heart['age'].apply(age_modifier)
heart['sex']=heart['sex'].apply(sex_modifier)
heart['cp']=heart['cp'].apply(cp_modifier)
heart['fbs']=heart['fbs'].apply(fbs_modifier)
heart['restecg']=heart['restecg'].apply(restecg_modifier)
heart['exang']=heart['exang'].apply(exang_modifier)
heart['slope']=heart['slope'].apply(slope_modifier)
heart['thal']=heart['thal'].apply(thal_modifier)
heart['num']=heart['num'].apply(num_modifier)
train,test=heart.random_split(0.9,seed=0)

logistic_regression=gl.logistic_classifier.create(train,target='num',features=['age','sex','cp','trestbps',
 'chol',
 'fbs',
 'restecg',
 'thalach',
 'exang',
 'oldpeak',
 'slope',
 'ca',
 'thal'])
logistic_regression_evaluation=logistic_regression.evaluate(test)
svm=gl.svm_classifier.create(train,target='num',features=['age','sex','cp','trestbps',
 'chol',
 'fbs',
 'restecg',
 'thalach',
 'exang',
 'oldpeak',
 'slope',
 'ca',
 'thal'])
svm_evaluation=svm.evaluate(test)
random_forest=gl.random_forest_classifier.create(train,target='num',features=['age','sex','cp','trestbps',
 'chol',
 'fbs',
 'restecg',
 'thalach',
 'exang',
 'oldpeak',
 'slope',
 'ca',
 'thal'])
random_forest_evaluation=random_forest.evaluate(test)
decision_tree=gl.decision_tree_classifier.create(train,target='num',features=['age','sex','cp','trestbps',
 'chol',
 'fbs',
 'restecg',
 'thalach',
 'exang',
 'oldpeak',
 'slope',
 'ca',
 'thal'])
decision_tree_evaluation=decision_tree.evaluate(test)

boosted_tree=gl.boosted_trees_classifier.create(train,target='num',features=['age','sex','cp','trestbps',
 'chol',
 'fbs',
 'restecg',
 'thalach',
 'exang',
 'oldpeak',
 'slope',
 'ca',
 'thal'])

boosted_tree_evaluation=boosted_tree.evaluate(test)
boosted_tree.save("boosted.model")
loaded_model=gl.load_model("boosted.model")
boosted_tree.export_coreml("heart.mlmodel")
print("Accuracy of Logistic Regression Model:{}".format(logistic_regression_evaluation["accuracy"]*100))
print("Accuracy of SVM Model:{}".format(svm_evaluation["accuracy"]*100))
print("Accuracy of Random Forest Model:{}".format(random_forest_evaluation["accuracy"]*100))
print("Accuracy of Decision Tree Model:{}".format(decision_tree_evaluation["accuracy"]*100))
print("Accuracy of Boosted Tree Model:{}".format(boosted_tree_evaluation["accuracy"]*100))


'''
inp={}
inp["age"]=sys.argv[1]
inp["sex"]=sys.argv[2]
inp["cp"]=sys.argv[3]
inp["trestbps"]=sys.argv[4]
inp["chol"]=sys.argv[5]
inp["fbs"]=sys.argv[6]
inp["restecg"]=sys.argv[7]
inp["thalach"]=sys.argv[8]
inp["exang"]=sys.argv[9]
inp["oldpeak"]=sys.argv[10]
inp["slope"]=sys.argv[11]
inp["ca"]=sys.argv[12]
inp["thal"]=sys.argv[13]
print(boosted_tree.predict(inp))
'''