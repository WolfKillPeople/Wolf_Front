namespace Wolf_Front.ViewModels
{
    public class ResponseBase<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        
        public T Data { get; set; }

        
        /// <summary>
        /// 房間人數
        /// </summary>
        public int Count { get; set; }

        public string Account { get; set; }

        public int TempNextRoom { get; set; }
    }
}
