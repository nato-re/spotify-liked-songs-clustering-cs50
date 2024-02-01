const button = document.getElementById('submit');
const HOST_URL = "http://localhost:8080"
const numberOfClustersInput = document.getElementById('cluster-number')
const loadingElement = document.getElementById('loading')
let clustersData;
const clusterStub = [
  {
      "musics": [
          {
              "artists": [
                  "Black Alien"
              ],
              "id": "2hnnQ338q1r258tZcafvEi",
              "name": "Capítulo Zero"
          },
          {
              "artists": [
                  "Black Alien"
              ],
              "id": "33KkhOpxBmBr2Jor1gs11d",
              "name": "Take Ten"
          },
          {
              "artists": [
                  "Luísa Sonza",
                  "Pabllo Vittar",
                  "Anitta"
              ],
              "id": "2ip4hxYupn3CSsHjn4l2a8",
              "name": "MODO TURBO"
          },
          {
              "artists": [
                  "Pabllo Vittar"
              ],
              "id": "29caulxU0jxucdVIyhSJTc",
              "name": "Amor de Que"
          },
          {
              "artists": [
                  "Michael Jackson"
              ],
              "id": "4jnFqNWeJCeCRHc4HCdxfd",
              "name": "Remember the Time"
          },
          {
              "artists": [
                  "Nirvana"
              ],
              "id": "2SHTKB8YYlawTGIuJ2b2ok",
              "name": "About A Girl"
          },
          {
              "artists": [
                  "Lloyd"
              ],
              "id": "2a03afRiyAbNAleOByVju4",
              "name": "Get It Shawty"
          },
          {
              "artists": [
                  "Ebony",
                  "AG Beatz"
              ],
              "id": "3owZapu16Fb3v2xb8K6CO9",
              "name": "Pensamentos Intrusivos"
          },
          {
              "artists": [
                  "The Pointer Sisters"
              ],
              "id": "1ot6jEe4w4hYnsOPjd3xKQ",
              "name": "I'm So Excited"
          },
          {
              "artists": [
                  "Pet Shop Boys"
              ],
              "id": "2Di0qFNb7ATroCGB3q0Ka7",
              "name": "West End Girls - 2018 Remaster"
          },
          {
              "artists": [
                  "Pet Shop Boys"
              ],
              "id": "4mVLzFbc3gaCoWCEENLouc",
              "name": "Domino Dancing"
          },
          {
              "artists": [
                  "Slipknot"
              ],
              "id": "6wqJeItl3Vc3az4ZicSQAB",
              "name": "Before I Forget"
          },
          {
              "artists": [
                  "Slipknot"
              ],
              "id": "61mWefnWQOLf90gepjOCb3",
              "name": "Duality"
          },
          {
              "artists": [
                  "Fall Out Boy"
              ],
              "id": "0a7BloCiNzLDD9qSQHh5m7",
              "name": "Dance, Dance"
          },
          {
              "artists": [
                  "The Offspring"
              ],
              "id": "717oSBYrcR8awQgUsmyE32",
              "name": "All I Want"
          },
          {
              "artists": [
                  "Skindred"
              ],
              "id": "581mukhDjta60CCwpvnjL9",
              "name": "Nobody"
          },
          {
              "artists": [
                  "Papa Roach"
              ],
              "id": "0ijEkXhF6IVN4qUjDkciTm",
              "name": "Infest"
          }
      ],
      "name": "High Energy Beats"
  },
  {
      "musics": [
          {
              "artists": [
                  "Black Alien"
              ],
              "id": "3L3uxLbJUDqr2bM7CGlZVJ",
              "name": "Au Revoir"
          },
          {
              "artists": [
                  "Mc Dricka"
              ],
              "id": "6EgcZKQYUjNu21UiPV2KZV",
              "name": "Vai Fazer Carão"
          },
          {
              "artists": [
                  "DeBarge"
              ],
              "id": "1c5KZhtOAOH7eFOlBekNhS",
              "name": "I Like It"
          },
          {
              "artists": [
                  "Bobby Brown"
              ],
              "id": "0s6e7ZafqOAUBDoQYGmxrc",
              "name": "Every Little Step"
          },
          {
              "artists": [
                  "Beyoncé"
              ],
              "id": "7cvkXf3AwPGT041PyOi5VX",
              "name": "Dance for You"
          },
          {
              "artists": [
                  "Heavy Baile",
                  "Rebecca",
                  "MC Tchelinho"
              ],
              "id": "3g8REFZ7x9evB8CzeIf29n",
              "name": "Maconha e Pente - Remix"
          },
          {
              "artists": [
                  "Betty Davis"
              ],
              "id": "16gAn2l94SvrbAVgECAK19",
              "name": "If I'm In Luck I Might Get Picked Up"
          },
          {
              "artists": [
                  "Kim Carnes"
              ],
              "id": "0odIT9B9BvOCnXfS0e4lB5",
              "name": "Bette Davis Eyes"
          },
          {
              "artists": [
                  "New Order"
              ],
              "id": "31MOjWj3CT3dCQsMV2b8Wu",
              "name": "Blue Monday '88"
          },
          {
              "artists": [
                  "The Kinks"
              ],
              "id": "1mfV2kv9RwFKVI8kEQlmOJ",
              "name": "All Day and All of the Night"
          },
          {
              "artists": [
                  "Rage Against The Machine"
              ],
              "id": "4K1DB7EedHPuVnhVrnvf2U",
              "name": "How I Could Just Kill a Man"
          },
          {
              "artists": [
                  "Rage Against The Machine"
              ],
              "id": "2t0tVmiSkHWvKgojpjO21Z",
              "name": "Maggie's Farm"
          },
          {
              "artists": [
                  "Rage Against The Machine"
              ],
              "id": "5YBVDvTSSSiqv7KZDeUlXA",
              "name": "Renegades Of Funk"
          },
          {
              "artists": [
                  "Rage Against The Machine"
              ],
              "id": "1wsRitfRRtWyEapl0q22o8",
              "name": "Guerrilla Radio"
          },
          {
              "artists": [
                  "Limp Bizkit"
              ],
              "id": "3IV4swNduIRunHREK80owz",
              "name": "Rollin' (Air Raid Vehicle)"
          },
          {
              "artists": [
                  "Linkin Park"
              ],
              "id": "4bYLTrlcqctyHck3fjhMgW",
              "name": "One Step Closer"
          }
      ],
      "name": "Instrumental Chill"
  },
  {
      "musics": [
          {
              "artists": [
                  "Maurice Fulton",
                  "Peggy Gou"
              ],
              "id": "15bJAVsKK8osEoMzYkQB1o",
              "name": "Jigoo - Radio Edit"
          },
          {
              "artists": [
                  "Marina Sena"
              ],
              "id": "3aexu2VagwWh2r3pd3PAJW",
              "name": "Voltei Pra Mim"
          },
          {
              "artists": [
                  "Lô Borges"
              ],
              "id": "7hfIiNdcy5c0MWxnoMvCYN",
              "name": "Trem De Doido"
          },
          {
              "artists": [
                  "Brad"
              ],
              "id": "7wUiP4gebrOSkH2Ii3aBwj",
              "name": "Bad for the Soul"
          },
          {
              "artists": [
                  "Darondo"
              ],
              "id": "260FtPzhpH7A0473nrMZ8R",
              "name": "Let My People Go"
          },
          {
              "artists": [
                  "Nick Drake"
              ],
              "id": "5ir0VEsMI7cLhN6SEiaKol",
              "name": "Road"
          }
      ],
      "name": "Energetic Dance Mix"
  },
  {
      "musics": [
          {
              "artists": [
                  "Montell Jordan"
              ],
              "id": "3ii5VBrIXJXKEVkjx1IAdP",
              "name": "Get It On Tonite"
          },
          {
              "artists": [
                  "Steve Lacy"
              ],
              "id": "12ILYlOEfWL8ei0BEgFJn0",
              "name": "N Side"
          },
          {
              "artists": [
                  "Tamia"
              ],
              "id": "3c6afiysmB7OnxQzzSqRfD",
              "name": "So Into You"
          },
          {
              "artists": [
                  "Aaliyah"
              ],
              "id": "6gdhHMWUv1pvkOHqCUGvCp",
              "name": "One In A Million"
          },
          {
              "artists": [
                  "Otto"
              ],
              "id": "7uAXmXFxBWkHFmLbxcxTGe",
              "name": "Hdeus"
          },
          {
              "artists": [
                  "Papisa"
              ],
              "id": "06aMsu7VdzPYD1grd5149U",
              "name": "Fenda"
          },
          {
              "artists": [
                  "Cassie"
              ],
              "id": "7k6IzwMGpxnRghE7YosnXT",
              "name": "Me & U"
          }
      ],
      "name": "Acoustic Chill Vibes"
  },
  {
      "musics": [
          {
              "artists": [
                  "Alicia Keys"
              ],
              "id": "3XVBdLihbNbxUwZosxcGuJ",
              "name": "If I Ain't Got You"
          },
          {
              "artists": [
                  "Shuggie Otis"
              ],
              "id": "2u3HmBPHrk3ooSdVikignW",
              "name": "Sweet Thang"
          },
          {
              "artists": [
                  "The Smashing Pumpkins"
              ],
              "id": "3ow0TQVttXQF8rLckmXgRx",
              "name": "Cherub Rock - 2011 Remaster"
          }
      ],
      "name": "Uplifting Dance Party"
  }
];
const figureStub = `<img class="graph" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAHgCAYAAAA10dzkAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjguMiwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8g+/7EAAAACXBIWXMAAA9hAAAPYQGoP6dpAABgRklEQVR4nO3dd3hUVf4G8PfcaZn0HloIvVcDSC8rTVGsgG0BKwqCrmXtFBu6iquIYv2JulhWFywoKNJBOiKC9BYIkISQTjLl3vP7IzAypgKZuZO57+d58pi598zMmzFkvnPOuecIKaUEERERERmGoncAIiIiIvIvFoBEREREBsMCkIiIiMhgWAASERERGQwLQCIiIiKDYQFIREREZDAsAImIiIgMhgUgERERkcGwACQiIiIyGBaARERERAbDApCIiIjIYFgAEhERERkMC0AiIiIig2EBSERERGQwLACJiIiIDIYFIBEREZHBsAAkIiIiMhgWgEREREQGwwKQiIiIyGBYABIREREZDAtAIiIiIoNhAUhERERkMCwAiYiIiAyGBSARERGRwbAAJCIiIjIYFoBEREREBsMCkIiIiMhgWAASERERGQwLQCIiIiKDYQFIREREZDAsAImIiIgMhgUgERERkcGwACQiIiIyGBaARERERAbDApCIyEAaNWqEK6+8Uu8YRKQzFoBEVKU5c+ZACIFNmzZ5Hc/Ly0O3bt0QEhKCRYsWVXpfIQRWr15d5ryUEsnJyRBCBE1hkp+fj+effx5dunRBVFQUbDYbUlJSMGrUKHz//fd6xyMiglnvAERUO+Xn52Pw4MHYtm0b5s+fj6FDh1baPiQkBJ9++il69+7tdXzFihU4evQobDabL+P6zb59+zBkyBAcPnwY1157LUaPHo3w8HAcOXIEP/zwA6688kp8/PHH+Pvf/653VCIyMBaARHTeCgoKMGTIEGzduhXz5s3D5ZdfXuV9rrjiCnz55ZeYOXMmzOY///R8+umnSE1NxcmTJ30Z2S/cbjeuvfZaZGRkYMWKFejVq5fX+SlTpuCnn36CqqqVPk5RURHCwsJ8GZWIDI5DwER0XgoLCzF06FBs2bIF//vf/zBs2LBq3e+mm25CdnY2Fi9e7DnmdDrx1Vdf4eabby73Ppqm4bXXXkPbtm0REhKCpKQkjBs3Djk5OV7tvvnmGwwbNgz16tWDzWZD06ZN8eyzz5YptPr374927drhjz/+wIABAxAaGor69evjX//6V5nnfuONN9C2bVuEhoYiJiYGXbp0waefflrpz/jll19i+/btePrpp8sUf2cNHjzYq2A+O0S+YsUKjB8/HomJiWjQoAEA4PDhwxg/fjxatmwJu92OuLg4jBgxAocOHfJ6zLOPsXLlSowbNw5xcXGIjIzE6NGjy7xWZ61evdozfN+kSRN8/PHHlf5sRBRcWAASUbUVFRXh8ssvx8aNG/Hll1+e15y9Ro0aoUePHvjss888xxYuXIi8vDzceOON5d5n3LhxeOSRR9CrVy+8/vrruO222zB37lwMGTIELpfL027OnDkIDw/Hgw8+iNdffx2pqamYPHkyHnvssTKPmZOTg6FDh6Jjx46YMWMGWrVqhUcffRQLFy70tHnvvfcwadIktGnTBq+99hqmTZuGTp06Yf369ZX+jN999x0A4NZbb63263LW+PHj8ccff3jl3rhxI3755RfceOONmDlzJu655x4sWbIE/fv3x+nTp8s8xn333YedO3di6tSpGD16NObOnYtrrrkGUkqvdvv27cMNN9yAQYMGYcaMGYiJicHYsWOxY8eO885NRLWUJCKqwocffigByJSUFGmxWOTXX3993vfduHGjnDVrloyIiJCnT5+WUko5YsQIOWDAACmllCkpKXLYsGGe+61atUoCkHPnzvV6vEWLFpU5fvbxzjVu3DgZGhoqS0pKPMf69esnAciPP/7Yc8zhcMg6derI66+/3nPs6quvlm3btq32z3hW586dZXR0dJnjhYWFMisry/OVl5fnOXf29endu7d0u91e9yvv51q7dm2Zn+HsY6Smpkqn0+k5/q9//UsCkN98843nWEpKigQgV65c6TmWmZkpbTabfOihh877Zyai2ok9gERUbRkZGQgJCUFycvIF3X/kyJEoLi7GggULUFBQgAULFlQ4/Pvll18iKioKgwYNwsmTJz1fqampCA8Px7Jlyzxt7Xa75/uCggKcPHkSffr0wenTp7Fr1y6vxw0PD/fqobNarejWrRsOHDjgORYdHY2jR49i48aN5/Xz5efnIzw8vMzxJ598EgkJCZ6v8n7mu+66CyaTyevYuT+Xy+VCdnY2mjVrhujoaGzZsqXMY9x9992wWCye2/feey/MZjN++OEHr3Zt2rRBnz59PLcTEhLQ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w8PDpaqqnry9e/f2nHe73TIsLEz+/e9/9xw7fvy4BCDXrl3rle/zzz/3tMnOzpZ2u11+8cUXUkopb775Zjlo0CCvPI888ohs06aN53ZKSoq89dZbPbc1TZOJiYly9uzZUkopP/nkkzL5HQ6HtNvt8scff5RSlr7+KSkp0u12e9qMGDFCjho1yut5zv1/XhX2ABLVTuwBJDKIBQsWIDw8HCEhIbj88ssxatQoTJ061XO+ffv2sFqtVT5Ohw4dPN+HhYUhMjISmZmZAICtW7eiT58+sFgs1c7VvXt3CCE8t3v06IG9e/dCVVUApb1jV111FRo2bIiIiAj069cPAJCWllatx5dSVqvdzp070aNHD68svXr1QmFhIY4ePeo5du7PbzKZEBcXh/bt23uOJSUlAYDnNTn35zorNjYWLVu2xM6dOz3P3atXL6/2vXr18nod/vrcQgjUqVPH8zy//fYb9u3bh4iICISHhyM8PByxsbEoKSnB/v37Pfdr27YtTCaT53bdunXLZCWi4GfWOwAR+ceAAQMwe/ZsWK1W1KtXD2az9z//sLCwaj3OX4s7IQQ0TQNQOqxck4qKijBkyBAMGTIEc+fORUJCAtLS0jBkyBCvYc3KtGjRAgCwa9curyLsQpX385977GwBefY1qUmVvfaFhYVITU3F3Llzy9wvISGhWo9BRMbBHkAigwgLC0OzZs3QsGHDMsVfTenQoQNWrVrlmdtWHevXr/e6vW7dOjRv3hwmkwm7du1CdnY2XnzxRfTp0wetWrU6796qwYMHIz4+Hv/617/KPX92+ZLWrVtj7dq1Xj2Ga9asQUREBBo0aHBez1medevWeb7PycnBnj170Lp1a89zr1mzxqv9mjVr0KJFC6/euspccskl2Lt3LxITE9GsWTOvr6ioqGrntFqtXr2ORBScWAASUY257777kJ+fjxtvvBGbNm3C3r178cknn3guVChPWloaHnzwQezevRufffYZ3njjDdx///0AgIYNG8JqteKNN97AgQMH8O233+LZZ589r0xhYWF4//338f3332P48OH4+eefcejQIWzatAn//Oc/cc899wAAxo8fjyNHjmDixInYtWsXvvnmG0yZMgUPPvggFOXi/1Q+88wzWLJkCbZv346xY8ciPj7esyj2Qw89hCVLluDZZ5/Fnj178NFHH2HWrFl4+OGHq/34t9xyC+Lj43H11Vdj1apVOHjwIJYvX45JkyZ5DWFXpVGjRli5ciXS09Nx8uTJCtudOHECW7duxb59+wAAv//+O7Zu3eq5IIiIAhsLQCKqMXFxcVi6dCkKCwvRr18/pKam4r333qt0TuDo0aNRXFyMbt26YcKECbj//vs9i08nJCRgzpw5+PLLL9GmTRu8+OKLeOWVV84719VXX41ffvkFFosFN998M1q1aoWbbroJeXl5nqt869evjx9++AEbNmxAx44dcc899+COO+7AU089dWEvxl+8+OKLuP/++5GamooTJ07gu+++88y5vOSSS/Df//4Xn3/+Odq1a4fJkyfjmWeeOa+rnUNDQ7Fy5Uo0bNgQ1113HVq3bo077rgDJSUliIyMrPbjPPPMMzh06BCaNm3qNXT8V2+//TY6d+6Mu+66CwDQt29fdO7cGd9++221n4uI9CNkdWdIExHVsP79+6NTp041ut1coFm+fDkGDBiAnJwcXRbBJiIqD3sAiYiIiAyGBSARERGRwXAImIiIiMhg2ANIREREZDAsAImIiIgMhgUgERERkcGwACQiIiIyGBaARERERAbDApCIiIjIYFgAEhERERkMC0AiIiIig2EBSERERGQw/w8I4HeB4EIbKQAAAABJRU5ErkJggg=="/>`
const body = { data: clusterStub, figure: figureStub}
const getClusters = async () => {
  loadingStart()
  //verifyTokenExpirationAndRefresh()
  //if(!tokenIsValid) await getRefreshToken()
/*   const response = await fetch(`${HOST_URL}/generate?clusters=${numberOfClustersInput.value}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('access_token'),
    }
  })
 const body = await response.json()
  if(!response.ok) {
      if(response.status == 401) {
        const success = await getRefreshToken()
        if(!success) raiseError(body.message);
      }
      loadingEnd()
  } */
  document.getElementById('graph').innerHTML = body.figure
  clustersData = body.data
  createClustersElements(clusterStub)
  loadingEnd()
  button.innerText = "I want to do it again"
}
numberOfClustersInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    getClusters()
  }
})
button.addEventListener('click', getClusters)
window.onload = getClusters // exclude

