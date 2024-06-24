## コンポーネントのディレクトリ、tsx、index.tsを作成する 
Param(
  $n
)

if($n -eq $null){
  echo "-n option is essential."
  return
}else{
mkdir $n
New-Item -Path ./$n/ -Name "${n}.tsx" -ItemType "file" -Value @"
const ${n} = () => {
  return (
    <div>${n}</div>
  );
};

export default ${n};
"@

New-Item -Path ./$n/ -Name "index.ts" -ItemType "file" -Value @"
export { default as ${n} } from "./${n}.tsx";
"@
}

Add-Content -Path ./index.ts -Value @"
export * from "./${n}";
"@