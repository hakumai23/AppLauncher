import EditBar from "@/app/editbar"
export default function AdminEditPage(){
  return(
    <div className="flex flex-col gap-3">
      <span className="font-semibold text-3xl p-4 text-black dark:text-white mb-4">編集画面</span>
      <EditBar></EditBar>
    </div>
  )
}
