import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [plateau, setPlateau] = useState(['']);
  const [PlateauAffiche, setPlateauAffiche] = useState([]);
  const [nomClass, setNomClass] = useState([]);
  const [Fligne, setFligne] = useState([]);
  const [Fcolone, setFcolone] = useState([]);
  const [constru, setConstru] = useState(0);
  const [plateau2A, setPlateau2A] = useState([]);
  const [S, setS] = useState(<button onClick={()=>Construction()}>commencer le jeu</button>);
  const [Sel, setSel] = useState(0);
  const [pieceSel, setPieceSel] = useState(0);
  const [pati, setPati] = useState([]);
  const [tourJeu, setTourJeu] = useState('bleu');
  const rock = [[2,0],[2,7],[6,7],[6,0]];
  const [posiRoi, setPosiRoi] = useState([[0,3][7,3]]);
  const [old, setOld] = useState([]);
  

  
  const Construction = () =>{
    if (constru !==1){
    let boucle = [];
    let g = [];
    let bouclev2 =[];
    for (let y = 0; y < 8; y++) {
      boucle.push([""]);
      g.push([""]);
      bouclev2.push([""]);
  }
    for (let i = 0; i < 8; i++) {
      for (let z = 0; z < 8; z++) {
        if((i%2===0 && z%2===1) || (z%2===0 && i%2===1)){
          g[z][i] ="noir";
        }
        else{
          g[z][i] ="";
        }
      }
      boucle = GenerationPiece(i,boucle);
      if (i!== 7){
        for (let y = 0; y < 8; y++) {
          boucle[y].push("");
          bouclev2[y].push("");
      }
      }
    }
    setPosiRoi([[0,3][7,3]])
    setPlateau(boucle);
    setPlateau2A(bouclev2);
    setNomClass(g);
    setConstru(1);
    let u = 'A';
    setFligne(<ul className ='flex' >{[0,1,2,3,4,5,6,7,8].map((y)=> y===0 ? <li key={y}></li> :  <li key={y}>{String.fromCharCode(u.charCodeAt(0)+y-1)}</li>)}</ul>);
    setFcolone(<ul>{[1,2,3,4,5,6,7,8].map((y)=><li key={y}>{y}</li>)}</ul>);
    setS('')
  }
  }

  const GenerationPiece = (u,A2) =>{
    /*
    definition d'une pièce :
    piece = {        
    type = pion
    couleur = bleu
    }
    */
    let c = '';
    let tab = A2;
    if(u<4){
      c = 'rouge';
    }else{
      c = 'bleu';
    }
    if(u === 0 || u===7){
        tab[0][u] = {'type' : 'tour' , 'couleur' : c , 'bouge' : false} ;
        tab[1][u] = {'type' : 'cavalier' , 'couleur' : c , 'bouge' : false} ;
        tab[2][u] = {'type' : 'fou' , 'couleur' : c , 'bouge' : false} ;
        tab[3][u] = {'type' : 'dame' , 'couleur' : c , 'bouge' : false} ;
        tab[4][u] = {'type' : 'roi' , 'couleur' : c , 'bouge' : false} ;
        tab[5][u] = {'type' : 'fou' , 'couleur' : c , 'bouge' : false} ;
        tab[6][u] = {'type' : 'cavalier' , 'couleur' : c , 'bouge' : false} ;
        tab[7][u] = {'type' : 'tour' , 'couleur' : c , 'bouge' : false} ;
    }
    if(u === 1 || u===6){
        for (let i = 0; i < 8; i++) {
          tab[i][u] = {'type' : 'pion' , 'couleur' : c , 'bouge' : false} ;
        }
      }
    return(tab);
   }
  

  useEffect(()=>{
    if(constru === 1){
      let newTab = plateau
      let convert = []
      for (let j = 0; j < 8; j++) {
        convert.push(Array.from(newTab[j]))
      }
    let coul = nomClass;
    for (let x = 0; x < convert.length; x++) {
      let selecConvert = convert[x];
      let selecCoul = coul[x];
      for (let y = 0; y < convert.length; y++) {
        if (selecCoul[y].split(' ').includes('bleu') || selecCoul[y].split(' ').includes('rouge')){console.log('ajoute pas couleur')}else{
          
          switch(selecConvert[y]['couleur']){
            case 'bleu':
              selecCoul[y] = selecCoul[y] + ' bleu'
            break;
            case 'rouge':
              selecCoul[y] = selecCoul[y] + ' rouge'
            break;
          }
        }
        if (selecConvert !==''){
          switch(selecConvert[y]['type']){
            case 'pion':
              selecConvert[y] = 'P';
            break;
            case 'tour':
              selecConvert[y] = 'T';
            break;
            case 'cavalier':
              selecConvert[y] = 'C';
            break;
            case 'fou':
              selecConvert[y] = 'F';
            break;
            case 'dame':
              selecConvert[y] = 'D';
            break;
            case 'roi':
              selecConvert[y] = 'R';
            break;
          }
        }
      }
    }
    
    setPlateau2A(convert);
    setNomClass(coul);
  }
  },[plateau])

  useEffect(()=>{
    if (constru === 1){
      setPlateauAffiche([0,1,2,3,4,5,6,7].map((y)=><ul className='flex' key ={y}>{[0,1,2,3,4,5,6,7].map((x)=> <li className =  {nomClass[x][y]} onClick={()=>Action(x,y)} key={y*8+x-1}>{plateau2A[x][y]}</li> )}</ul>));
      /*
      console.log(posiRoi)
      if(nomClass[posiRoi[0][0],posiRoi[0][1]].split(' ').includes('selection') || nomClass[posiRoi[1][0],posiRoi[1][1]].split(' ').includes('selection')){
        //ajouter la class echec au roi
        let echecTab = [];
        let randomTab = nomClass;
        for (let j = 0; j < 8; j++) {
        echecTab.push(Array.from(randomTab[j]));
        }
        let change = '';
        let echecTab2 = '';
        if(nomClass[posiRoi[0][0],posiRoi[0][1]].split(' ').includes('selection')){
          echecTab2 = echecTab[posiRoi[0][0],posiRoi[0][1]].split(' ');
          for (let q = 0; q < echecTab2.length; q++){
            if(echecTab2[q]!== 'selection'){
              change = change + echecTab2[q]
            }
          }
          change = change + 'echec'
          echecTab[posiRoi[0][0],posiRoi[0][1]] = change

        }
        if(nomClass[posiRoi[1][0],posiRoi[1][1]].split(' ').includes('selection')){
          echecTab2 = echecTab[posiRoi[1][0],posiRoi[1][1]].split(' ');
          for (let q = 0; q < echecTab2.length; q++){
            if(echecTab2[q]!== 'selection'){
              change = change + echecTab2[q]
            }
          }
          change = change + 'echec'
          echecTab[posiRoi[1][0],posiRoi[1][1]] = change
      }
      }
      */
    }
  },[plateau2A,nomClass])

const Avance = (piece,coo) =>{
  let newPosiRoi = posiRoi;
  let newTab = plateau;
  let after = [];
  let changecolo = [];
  for (let j = 0; j < 8; j++) {
    after.push(Array.from(newTab[j]));
  }
  let coloTab = nomClass;
  for (let j = 0; j < 8; j++) {
    changecolo.push(Array.from(coloTab[j]));
  }
  let temp = changecolo[coo[0]][coo[1]].split(' ')
  let val = ''
  let retire =  ''
  if(temp.includes('rouge')){
    retire ='rouge'
  }
  else{
    retire = 'bleu'
  }
  for (let z = 0; z < temp.length; z++) {
    if (temp[z] !== retire){
      val = val +' '+ temp[z]
    }
  }
  if(after[piece[0]][piece[1]]['type']==='pion'){
    //prise en patience pion
    if(coo[0]===pati[0] && coo[1]-1 === pati[1] && pati[0] !== piece[0]){
      after[coo[0]][coo[1]-1] = ""
      console.log('prise en pati')
    }
    if(coo[0]===pati[0] && coo[1]+1 === pati[1] && pati[0] !== piece[0]){
      after[coo[0]][coo[1]+1] = ""
      console.log('prise en pati')
    }
    //pion transformation
    if(coo[1]===0 || coo[1]===7){
      after[piece[0]][piece[1]] = {'type' : 'dame' , 'couleur' : after[piece[0]][piece[1]]['couleur']}
    }
  }
  if((coo[1]+2 === piece[1] || coo[1]-2 === piece[1]) && after[piece[0]][piece[1]]['type']==='pion'){
    setPati(coo)
  }else{
    setPati([])
  }

  //rock
  if(after[piece[0]][piece[1]]['bouge'] == false && after[piece[0]][piece[1]]['type'] === 'roi'){
    for (let k = 0; k < 4; k++){
      
      if(rock[k][0]===coo[0] && rock[k][1]===coo[1]){
        if (coo[0] === 6){
          after[7][coo[1]]['bouge']=true
          after[5][coo[1]] = after[7][coo[1]]
          after[7][coo[1]] = ''
        }
        if (coo[0] === 2){
          after[0][coo[1]]['bouge']=true
          after[3][coo[1]] = after[0][coo[1]]
          after[0][coo[1]] = ''
        }
      }
    }
  }
  after[piece[0]][piece[1]]['bouge'] = true;
  changecolo[coo[0]][coo[1]] = val
  after[coo[0]][coo[1]] = after[piece[0]][piece[1]];
  after[piece[0]][piece[1]] = "";
  setPlateau(after)
  if (after[coo[0]][coo[1]]['type'] ==='roi'){
    if(after[coo[0]][coo[1]]['couleur'] === 'rouge'){
      newPosiRoi[0] = [coo]
    }else{
      newPosiRoi[1] = [coo]
    }
    setPosiRoi(newPosiRoi)
  }
  //parametrer l'echec newPosiRoi
  for (let v = 0; v < 8; v++){
    for (let w = 0; w < 8; w++){
      Selection(v,w)
    }
  }
  
  Unselec(changecolo)
  
}

const Mouvement = (endroit) => {
  return(nomClass[endroit[0]][endroit[1]].split(' ').includes ("selection"))
}


const Selection = (x,y) =>{
  let newTab = nomClass;
  let peutSelec = [];
  for (let j = 0; j < 8; j++) {
    peutSelec.push(Array.from(newTab[j]));
  }
  let type = plateau[x][y]['type'];
  let typeIni = type;
  let couleur = plateau[x][y]['couleur'];
  let dep = []
  let coul =1;
  let newX = x + coul;
  let newY = y + coul;
  switch(type){
    case 'pion':
      //deplacement normal
      let posiIni =0
      if(couleur === 'rouge'){
        coul = 1;
        posiIni = 1
      }else{ 
        coul =-1;
        posiIni = 6
      }
      if(plateau[x][y+coul] ===''){
        dep.push([x,y+coul])
        //premier deplacement
        if ((y === posiIni && plateau[x][y+coul*2] ==='')){
          dep.push([x,y+coul*2])
        }
      } 

      //mange
      if (x !== 7){
        if(plateau[x+1][y+coul] !== '' && plateau[x+1][y+coul]['couleur'] !== couleur){
          dep.push([x+1,y+coul])
        }
        //prise en patience
        if (x+1 == pati[0] && y==pati[1]&& plateau[x+1][y]['couleur'] !== couleur){
          dep.push([x+1,y+coul])
        }
      } 
      if (x !== 0){
        if(plateau[x-1][y+coul] !== '' && plateau[x-1][y+coul]['couleur'] !== couleur){
          dep.push([x-1,y+coul])
        }
        //prise en patience
        if (x-1 == pati[0] && y==pati[1] && plateau[x-1][y]['couleur'] !== couleur){
          dep.push([x-1,y+coul])
        }
      }
    break;
    
    case 'cavalier':
      newX = x+2;
      newY = y+2;
      for (let q = 0; q < 2; q++) {
        if(newX < 8 && newX >= 0){
          if(y+1 < 8 && (plateau[newX][y+1] ==='' || plateau[newX][y+1]['couleur'] !== couleur)){
            dep.push([newX,y+1]);
          }
          if(y-1 >= 0 && (plateau[newX][y-1] ==='' || plateau[newX][y-1]['couleur'] !== couleur)){
            dep.push([newX,y-1]);
          }
        }
        if(newY < 8 && newY >= 0){
          if(x+1 < 8 && (plateau[x+1][newY] ==='' || plateau[x+1][newY]['couleur'] !== couleur)){
            dep.push([x+1,newY]);
          }
          if(x-1 >= 0 && (plateau[x-1][newY] ==='' || plateau[x-1][newY]['couleur'] !== couleur)){
            dep.push([x-1,newY]);
          }
        }
        newY = y-2;
        newX = x-2;
      }
    break;
    
    case 'roi':
      for (let g = 0; g < 2; g++) {
        if (x+coul < 8 && x+coul >= 0 &&  (plateau[x+coul][y] ==='' || plateau[x+coul][y]['couleur'] !== couleur)){
          dep.push([x+coul,y])
        }
        if (y+coul < 8 && y+coul >= 0 && (plateau[x][y+coul] ==='' || plateau[x][y+coul]['couleur'] !== couleur)){
          dep.push([x,y+coul])
        }
        if (y+coul < 8 && y+coul >= 0 && x+coul < 8 && x+coul >= 0 && (plateau[x+coul][y+coul] ==='' || plateau[x+coul][y+coul]['couleur'] !== couleur)){
          dep.push([x+coul,y+coul])
        }
        if (y-coul < 8 && y-coul >= 0 && x+coul < 8 && x+coul >= 0 && (plateau[x+coul][y-coul] ==='' || plateau[x+coul][y-coul]['couleur'] !== couleur)){
          dep.push([x+coul,y-coul])
        }
        coul = coul*(-1)
      }
      //rock
      if(plateau[x][y]['bouge']===false){
        if(plateau[5][y] ==='' && plateau[6][y] ==='' && plateau[7][y]['bouge'] ===false){
          dep.push([6,y]);

        }
        if(plateau[3][y] ==='' && plateau[2][y] ==='' && plateau[1][y] ==='' && plateau[0][y]['bouge'] ===false){
          dep.push([2,y]);
        }
      }
    break;
    default:
    
    if(type === 'dame'){
      type = 'tour';
    }

    if(type === 'tour'){

      for (let w = 0; w < 2; w++) {
        if (newX < 8 && newX >= 0){
          while(newX < 8 && newX >= 0 && plateau[newX][y] ===''){
            dep.push([newX,y]);
            newX=newX+coul;
          }
          if (newX < 8 && newX >= 0){
            if(plateau[newX][y]['couleur']!==plateau[x][y]['couleur']){
              dep.push([newX,y]);
            }
          }
        }
        if (newY < 8 && newY >= 0){
          while(newY < 8 && newY >= 0 && plateau[x][newY] ===''){
            dep.push([x,newY]);
            newY=newY+coul;
          }
          if (newY < 8 && newY >= 0){
            if(plateau[x][newY]['couleur']!==plateau[x][y]['couleur']){
              dep.push([x,newY]);
            }
          }
        }
        coul = coul*(-1)
        newX = x + coul;
        newY = y + coul;
      }
      if (typeIni ==='dame'){type = 'fou'}
    }

    if(type === 'fou'){
      for (let w = 0; w < 2; w++) {
        if (newX < 8 && newX >= 0 && newY < 8 && newY >= 0){
          while(newX < 8 && newX >= 0 && newY < 8 && newY >= 0 && plateau[newX][newY] ===''){
            dep.push([newX,newY]);
            newX=newX+coul;
            newY=newY+coul;

          }
          if (newX < 8 && newX >= 0 && newY < 8 && newY >= 0){
            if(plateau[newX][newY]['couleur']!==plateau[x][y]['couleur']){
              dep.push([newX,newY]);
            }
          }
        } 
        coul = coul*(-1)
        newX = x + coul;
        newY = y + coul;
      }
      coul = coul*(-1)
      newX = x - coul;
      newY = y + coul;
      for(let z = 0; z < 2; z++){
        if (newX < 8 && newX >= 0 && newY < 8 && newY >= 0){
          while(newX < 8 && newX >= 0 && newY < 8 && newY >= 0 && plateau[newX][newY] ===''){
            dep.push([newX,newY]);
            newX=newX-coul;
            newY=newY+coul;

          }
          if (newX < 8 && newX >= 0 && newY < 8 && newY >= 0){
            if(plateau[newX][newY]['couleur']!==plateau[x][y]['couleur']){
              dep.push([newX,newY]);
            }
          }
        }
          coul = coul*(-1)
          newX = x - coul;
          newY = y + coul;
        
      }

      if (typeIni ==='dame'){type = 'dame'}
    }
    break;
  }
  for (let i = 0; i < dep.length; i++) {
    peutSelec[dep[i][0]][dep[i][1]] = peutSelec[dep[i][0]][dep[i][1]] + ' selection'
  }
  setSel(1)
  setPieceSel([x,y])
  setNomClass(peutSelec)
}

const Unselec = (tab) =>{
  let newTab = tab;
  let cop = [];
  for (let j = 0; j < 8; j++) {
    cop.push(Array.from(newTab[j]));
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if((cop[x][y].split(' ').includes ("selection"))){
        let temp = cop[x][y].split(' ')
        let val = ''
        for (let z = 0; z < temp.length-1; z++) {
          val = val +' '+ temp[z]
        }
        cop[x][y] = val
      }
    }
  }
  setSel(0)
  setPieceSel([])
  setNomClass(cop)
}

const Action = (x,y) =>{
  if(Sel===0 && plateau[x][y] !=="" && tourJeu === plateau[x][y]['couleur']){
    Selection(x,y) 
  }else if(Mouvement([x,y])){ 
    Avance(pieceSel,[x,y]) 
    if(tourJeu === 'rouge'){
      setTourJeu('bleu') 
    }else{
      setTourJeu('rouge')
    }
  }else{
    Unselec(nomClass)
  }
}

  //window.onload = Construction()
  return(
    <div className = 'all'>
    {Fligne}
    <div className = "flex">
    {Fcolone}
    <div>{PlateauAffiche}</div>
    </div>
    {S}
    </div>
  )
}

export default App;
