import turicreate as tc
import sys
model=tc.load_model("boosted.model")
inp={}
inp["age"]=int(sys.argv[1])
inp["sex"]=int(sys.argv[2])
inp["cp"]=int(sys.argv[3])
inp["trestbps"]=float(sys.argv[4])
inp["chol"]=float(sys.argv[5])
inp["fbs"]=int(sys.argv[6])
inp["restecg"]=int(sys.argv[7])
inp["thalach"]=float(sys.argv[8])
inp["exang"]=int(sys.argv[9])
inp["oldpeak"]=float(sys.argv[10])
inp["slope"]=int(sys.argv[11])
inp["ca"]=int(sys.argv[12])
inp["thal"]=int(sys.argv[13])
print(model.classify(inp)["class"]);
print((model.classify(inp)["probability"])*100);
