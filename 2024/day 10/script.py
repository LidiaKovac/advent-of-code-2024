 
# --------------------------------------------------------------------------------
import os
import re
import locale
import random
locale.setlocale(locale.LC_ALL,"it_IT.UTF-8")
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
TITOLO = "Advent of Code 2024 - Day 10: Hoof It"
FILE_TEST = "./2024/day 10/d_10_0.txt"
FILE_DATI = "d_10_1.txt"
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
def main():
 
  print(F"{clear_screen}")
  print(F"{c_l_red} {TITOLO} {c_reset}")
  pausa()
 
  for gruppo in [1,2] :
    #
    if gruppo == 1 : titolo_gruppo = "[1] - dati di prova" 
    if gruppo == 2 : titolo_gruppo = "[2] - dati del puzzle" 
    print(F"{c_l_red} {titolo_gruppo} {c_reset}\n")
    #
    if gruppo == 1 : file_name = FILE_TEST 
    if gruppo == 2 : file_name = FILE_DATI
    mappa = load_mappa(file_name)
    # print_dict("Mappa",mappa)
    #
    elabora_1(mappa)
    # elabora_2(mappa)
    #
    pausa()
 
  #
  # ESAGERIAMO SU UNA MEGA MAPPA DI 1000 x 1000 CASELLE
  #
  # genera_mappa("d_10_2_ESAGERIAMO.txt",1000)
  # mappa=load_mappa("d_10_2_ESAGERIAMO.txt")
  #print_dict("Mappa esagerata",mappa)
  # elabora_1(mappa)
  # elabora_2(mappa)
  # pausa()
 
  print("\n Fine programma. \n")
# --------------------------------------------------------------------------------
 
 
# --------------------------------------------------------------------------------
def genera_mappa(file_name,max_range):
  livelli = ['0','1','2','3','4','5','6','7','8','9']
  file_obj = open(file_name,'w')
  for y in range(max_range) :
    riga = ""
    for x in range(max_range) :
      casuale = random.randint(0,9)
      riga += livelli[casuale]
    file_obj.write(F"{riga}\n")
  file_obj.close()
# --------------------------------------------------------------------------------
 
 
 
# --------------------------------------------------------------------------------
def load_mappa(file_name) :
  mappa = dict()
  if os.path.isfile(file_name) :
    file_obj = open(file_name,'r')
    x = 0 ; y = 0
    while True :
      linea = file_obj.readline()
      if not linea : break
      linea = linea.strip('\r').strip('\n')
      x = 0
      for car in linea : mappa[(x,y)]=car ; x+= 1
      y += 1
  #
  return mappa
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
def elabora_1(mappa) :
  print(F"{c_white} [1] Qual'è la somma di tutti i percorsi ? {c_reset}\n")
  percorsi = list()
  #
  for pos in mappa.keys() :
    if mappa[pos] == '0' : x,y=pos ; percorsi.append((x,y,x,y))
  # print_list("Percorsi",percorsi)
  #
  for liv in ['1','2','3','4','5','6','7','8','9'] :
    new_percorsi = list()
    for percorso in percorsi :
      x0,y0,x,y = percorso
      for (xx,yy) in [(x,y-1),(x+1,y),(x,y+1),(x-1,y)] :
        car = mappa.get((xx,yy),'.')
        if car == liv : new_percorsi.append((x0,y0,xx,yy))
    percorsi = new_percorsi
  percorsi = sorted(list(set(percorsi)))
  print(len(percorsi))
#   print_list("Percorsi",percorsi)
  #
  risultato = len(percorsi)
  print(F" Risultato = {c_l_yellow}{risultato:n}{c_reset} \n")
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
def elabora_2(mappa) :
  print(F"{c_white} [1] Qual'è la somma delle valutazioni di tutti i percorsi ? {c_reset}\n")
  percorsi = list()
  #
  for pos in mappa.keys() :
    if mappa[pos] == '0' : x,y=pos ; percorsi.append((x,y,x,y))
  # print_list("Percorsi",percorsi)
  #
  for liv in ['1','2','3','4','5','6','7','8','9'] :
    new_percorsi = list()
    for percorso in percorsi :
      x0,y0,x,y = percorso
      for (xx,yy) in [(x,y-1),(x+1,y),(x,y+1),(x-1,y)] :
        car = mappa.get((xx,yy),'.')
        if car == liv : new_percorsi.append((x0,y0,xx,yy))
    percorsi = new_percorsi
  # print_list("Percorsi",percorsi)
  #
  risultato = len(percorsi)
  print(F" Risultato = {c_l_yellow}{risultato:n}{c_reset} \n")
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
def print_dict(descr,dizionario) :
  print(F"\n Dizionario : {c_l_yellow}{descr}{c_reset} [ {len(dizionario):n} ]\n")
  for key in sorted(dizionario.keys()) :
    print(F'   {key} = {dizionario[key]} ')
  print("")
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
def print_list(descr,lista) :
  print(F"\n Lista : {c_l_yellow}{descr}{c_reset} [ {len(lista):n} ]\n")
  for elem in lista : print(F'   {elem}')
  print("")
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
def print_set(descr,gruppo) :
  print(F"\n Set : {c_l_yellow}{descr}{c_reset} [ {len(gruppo):n} ]\n")
  print(F"[ ",end="")
  for elem in sorted(gruppo) : print(F" _{elem}_ ",end="")
  print(F" ] ")
  print("")
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
def pausa() :
  print(F"{c_l_yellow}")
  input(F" Premi invio per continuare ")
  print(F"{c_reset}")
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
clear_screen   = "\x1b[2J\x1b[3J\x1b[H"
c_reset    = "\x1b[0m"
c_l_red    = "\x1b[91m"
c_l_green  = "\x1b[92m"
c_l_yellow = "\x1b[93m"
c_l_blue   = "\x1b[94m"
c_white    = "\x1b[97m"
# --------------------------------------------------------------------------------
 
# --------------------------------------------------------------------------------
if __name__ == "__main__" : main()
# --------------------------------------------------------------------------------
 