using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIDIMSLite.Api.Models;
using SIDIMSLite.Api.ViewModel;


namespace SIDIMSLite.Api.Controllers
{

    [Route("api/clients/")]
    public class ClientsController : Controller
    {
        private readonly AspectContext context;
        private readonly IMapper mapper;

        public ClientsController(AspectContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<ClientModel>> GetSidClients()
        {
            var results = await context.Clients.ToListAsync();
            return mapper.Map<IEnumerable<Clients>, IEnumerable<ClientModel>>(results);
        }

        [HttpGet("{clientId}/products")]
        public async Task<IEnumerable<StockModel>> GetClientStocks(int clientId)
        {
            var products = await context.Stock.Where(p => p.ClientId == clientId && p.CategoryId == 1).ToListAsync();
            return mapper.Map<IEnumerable<Stock>, IEnumerable<StockModel>>(products);
        }

        [HttpGet("{clientId}/mis")]
        public async Task<IEnumerable<StockReportModel>> GetClientMISs(int clientId)
        {
            var products = await context.Mis
                .Include(c => c.Stock)
                .Include(p => p.Operation)
                .Where(p => p.ClientId == clientId).ToListAsync();
            return mapper.Map<IEnumerable<Mis>, IEnumerable<StockReportModel>>(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await context.Clients.SingleOrDefaultAsync(it => it.Id == id);

            if (client == null) return NotFound();

            var result = mapper.Map<Clients, ClientModel>(client);

            return Ok(result);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetClientByName(string name)
        {
            var client = await context.Clients.SingleOrDefaultAsync(it => it.Client == name);

            if (client == null) return NotFound();

            var result = mapper.Map<Clients, ClientModel>(client);

            return Ok(result);
        }

        [HttpGet("products/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await context.Stock
                .SingleOrDefaultAsync(it => it.Id == id);

            if (product == null) return NotFound();

            var result = mapper.Map<Stock, StockModel>(product);

            return Ok(result);
        }

        [HttpGet("{clientId}/vaults")]
        public async Task<IEnumerable<VaultModel>> GetClientVaults(int clientId, string rangeType, [FromQuery]string startDate, [FromQuery]string endDate)
        {

            var startDateStr = "";
            var endDateStr = "";

            DateTime start = new DateTime();
            DateTime end = new DateTime();

            int first, last = new int();
            int month, year = new int();

            if (rangeType == "ThisMonth")
            {
                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "LastMonth")
            {
                month = DateTime.Now.Month - 1;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "DateRange")
            {

                System.Globalization.CultureInfo ci = System.Globalization.CultureInfo.CreateSpecificCulture("en-GB");
                startDateStr = Convert.ToDateTime(startDate, ci.DateTimeFormat).ToString("d");//short date pattern
                endDateStr = Convert.ToDateTime(endDate, ci.DateTimeFormat).ToString("d");//short date pattern

                var startTime = TimeSpan.Parse("00:00:00");
                var endTime = TimeSpan.Parse("23:59:59");

                DateTime stockStartDate = Convert.ToDateTime(startDateStr) + startTime;
                DateTime stockEndDate = Convert.ToDateTime(endDateStr) + endTime;

                start = stockStartDate; //DateTime.ParseExact(stockStartDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                end = stockEndDate; //DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            else
            {
                start = DateTime.Now;
                end = DateTime.Now;
            }

            var vaults = await context.Mis
                .Include(s => s.Stock)
                .Include(o => o.Operation)
                .Where(p => p.ClientId == clientId && (p.Date >= start && p.Date <= end))
                .OrderByDescending(o => o.Id)
                .ToListAsync();

            var distincts = vaults.GroupBy(g => g.StockId)
                .Select(s => s.First());

            return mapper.Map<IEnumerable<Mis>, IEnumerable<VaultModel>>(distincts);
        }

        [HttpGet("{productId}/stockreports")]
        public async Task<IEnumerable<StockReportModel>> GetClientStockReports(int productId, string rangeType, [FromQuery]string startDate, [FromQuery]string endDate)
        {
            var startDateStr = "";
            var endDateStr = "";


            DateTime start = new DateTime();
            DateTime end = new DateTime();

            int first, last = new int();
            int month, year = new int();

            if (rangeType == "ThisMonth")
            {
                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "LastMonth")
            {
                month = DateTime.Now.Month - 1;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "DateRange")
            {

                System.Globalization.CultureInfo ci = System.Globalization.CultureInfo.CreateSpecificCulture("en-GB");
                startDateStr = Convert.ToDateTime(startDate, ci.DateTimeFormat).ToString("d");//short date pattern
                endDateStr = Convert.ToDateTime(endDate, ci.DateTimeFormat).ToString("d");//short date pattern

                var startTime = TimeSpan.Parse("00:00:00");
                var endTime = TimeSpan.Parse("23:59:59");

                DateTime stockStartDate = Convert.ToDateTime(startDateStr) + startTime;
                DateTime stockEndDate = Convert.ToDateTime(endDateStr) + endTime;


                start = stockStartDate; //DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                end = stockEndDate; //DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            else
            {
                start = DateTime.Now;
                end = DateTime.Now;
            }

            var vaults = await context.Mis.Include(o => o.Operation).Where(p => p.StockId == productId && (p.Date >= start && p.Date <= end)).ToListAsync();
            return mapper.Map<IEnumerable<Mis>, IEnumerable<StockReportModel>>(vaults);
        }

        [HttpGet("{productId}/IssuanceStockReports")]
        public async Task<IEnumerable<StockConsumptionReportModel>> GetIssuanceStockReports(int productId, string rangeType, [FromQuery]string startDate, [FromQuery]string endDate)
        {

            var startDateStr = "";
            var endDateStr = "";

            DateTime start = new DateTime();
            DateTime end = new DateTime();

            int first, last = new int();
            int month, year = new int();

            if (rangeType == "ThisMonth")
            {
                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "LastMonth")
            {
                month = DateTime.Now.Month - 1;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "DateRange")
            {

                System.Globalization.CultureInfo ci = System.Globalization.CultureInfo.CreateSpecificCulture("en-GB");
                startDateStr = Convert.ToDateTime(startDate, ci.DateTimeFormat).ToString("d");//short date pattern
                endDateStr = Convert.ToDateTime(endDate, ci.DateTimeFormat).ToString("d");//short date pattern

                var startTime = TimeSpan.Parse("00:00:00");
                var endTime = TimeSpan.Parse("23:59:59");

                DateTime stockStartDate = Convert.ToDateTime(startDateStr) + startTime;
                DateTime stockEndDate = Convert.ToDateTime(endDateStr) + endTime;

                start = stockStartDate; //DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                end = stockEndDate; //DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }

            var vaults = await context.Mis.Include(o => o.Operation).Where(p => p.StockId == productId && p.Operation.Operation == "Issuance" && (p.Date >= start && p.Date <= end)).ToListAsync();
            //var distincts = vaults.GroupBy(g => g.FileName).Select(s => s.First());
            var vaultModels = mapper.Map<IEnumerable<Mis>, IEnumerable<StockConsumptionReportModel>>(vaults);

            foreach (var item in vaultModels)
            {
                item.IssuanceQuantity = GetJobIssuances(item.FileName, start, end);
                item.WasteQuantity = GetJobWastes(item.FileName, start, end);
                var lastedDate = GetLastUpdate(item.Id);
            }

            return vaultModels;
        }

        [HttpGet("{productId}/PersoStockReports")]
        public async Task<IEnumerable<StockReportModel>> GetPersoStockReports(int productId, string rangeType, [FromQuery]string startDate, [FromQuery]string endDate)
        {
            var startDateStr = "";
            var endDateStr = "";

            DateTime start = new DateTime();
            DateTime end = new DateTime();

            int first, last = new int();
            int month, year = new int();

            if (rangeType == "ThisMonth")
            {
                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "LastMonth")
            {
                month = DateTime.Now.Month - 1;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "DateRange")
            {
                System.Globalization.CultureInfo ci = System.Globalization.CultureInfo.CreateSpecificCulture("en-GB");
                startDateStr = Convert.ToDateTime(startDate, ci.DateTimeFormat).ToString("d");//short date pattern
                endDateStr = Convert.ToDateTime(endDate, ci.DateTimeFormat).ToString("d");//short date pattern

                var startTime = TimeSpan.Parse("00:00:00");
                var endTime = TimeSpan.Parse("23:59:59");

                DateTime stockStartDate = Convert.ToDateTime(startDateStr) + startTime;
                DateTime stockEndDate = Convert.ToDateTime(endDateStr) + endTime;

                start = stockStartDate; //DateTime.Parse(startDate);
                end = stockEndDate; //DateTime.Parse(endDate);
            }
            else
            {
                start = DateTime.Now;
                end = DateTime.Now;
            }

            var vaults = await context.Mis.Include(o => o.Operation).Where(p => p.StockId == productId && p.Operation.Operation == "Issuance" && (p.Date >= start && p.Date <= end)).OrderByDescending(o => o.Id).ToListAsync();
            return mapper.Map<IEnumerable<Mis>, IEnumerable<StockReportModel>>(vaults);
        }


        private int GetJobIssuances(string fileName, DateTime start, DateTime end)
        {
            //&& (a.Date >= start && a.Date <= end)
            return context.Mis.Where(a => a.FileName == fileName && a.Operation.Operation == "Issuance").Select(s => s.CardQuantity).Sum();
        }

        private int GetJobWastes(string fileName, DateTime start, DateTime end)
        {
            //&& (a.Date >= start && a.Date <= end)
            return context.Mis.Where(a => a.FileName == fileName && a.Operation.Operation == "Waste").Select(s => s.CardQuantity).Sum();
        }

        [HttpGet("{productId}/WasteStockReports")]
        public async Task<IEnumerable<StockConsumptionReportModel>> GetWasteStockReports(int productId, string rangeType, [FromQuery]string startDate, [FromQuery]string endDate)
        {

            var startDateStr = "";
            var endDateStr = "";

            DateTime start = new DateTime();
            DateTime end = new DateTime();

            int first, last = new int();
            int month, year = new int();

            if (rangeType == "ThisMonth")
            {

                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "LastMonth")
            {
                month = DateTime.Now.Month - 1;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "DateRange")
            {

                System.Globalization.CultureInfo ci = System.Globalization.CultureInfo.CreateSpecificCulture("en-GB");
                startDateStr = Convert.ToDateTime(startDate, ci.DateTimeFormat).ToString("d");//short date pattern
                endDateStr = Convert.ToDateTime(endDate, ci.DateTimeFormat).ToString("d");//short date pattern

                var startTime = TimeSpan.Parse("00:00:00");
                var endTime = TimeSpan.Parse("23:59:59");

                DateTime stockStartDate = Convert.ToDateTime(startDateStr) + startTime;
                DateTime stockEndDate = Convert.ToDateTime(endDateStr) + endTime;

                start = stockStartDate; //DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                end = stockEndDate; //DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            else
            {
                start = DateTime.Now;
                end = DateTime.Now;
            }

            var vaults = await context.Mis.Include(o => o.Operation)
                .Where(p => p.StockId == productId && p.Operation.Operation == "Waste" && (p.Date >= start && p.Date <= end)).OrderByDescending(o => o.Id).ToListAsync();

            return mapper.Map<IEnumerable<Mis>, IEnumerable<StockConsumptionReportModel>>(vaults);

        }

        [HttpGet("{productId}/NewStockReports")]
        public async Task<IEnumerable<StockConsumptionReportModel>> GetNewStockReports(int productId, string rangeType, [FromQuery]string startDate, [FromQuery]string endDate)
        {
            var startDateStr = "";
            var endDateStr = "";



            DateTime start = new DateTime();
            DateTime end = new DateTime();

            int first, last = new int();
            int month, year = new int();

            if (rangeType == "ThisMonth")
            {
                first = 1;
                last = 30;
                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "LastMonth")
            {
                month = DateTime.Now.Month - 1;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "DateRange")
            {

                System.Globalization.CultureInfo ci = System.Globalization.CultureInfo.CreateSpecificCulture("en-GB");
                startDateStr = Convert.ToDateTime(startDate, ci.DateTimeFormat).ToString("d");//short date pattern
                endDateStr = Convert.ToDateTime(endDate, ci.DateTimeFormat).ToString("d");//short date pattern

                var startTime = TimeSpan.Parse("00:00:00");
                var endTime = TimeSpan.Parse("23:59:59");

                DateTime stockStartDate = Convert.ToDateTime(startDateStr) + startTime;
                DateTime stockEndDate = Convert.ToDateTime(endDateStr) + endTime;


                start = stockStartDate; //DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                end = stockEndDate; //DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            else
            {
                start = DateTime.Now;
                end = DateTime.Now;
            }

            var vaults = await context.Mis.Include(o => o.Operation)
                .Where(p => p.StockId == productId && p.Operation.Operation == "New Stock" && (p.Date >= start && p.Date <= end)).OrderByDescending(o => o.Id).ToListAsync();

            return mapper.Map<IEnumerable<Mis>, IEnumerable<StockConsumptionReportModel>>(vaults);
        }


        [HttpGet("{productId}/summary")]
        public async Task<IActionResult> GetClientStockSummary(int productId, string rangeType, [FromQuery]string startDate, [FromQuery]string endDate)
        {

            var startDateStr = "";
            var endDateStr = "";


            DateTime start = new DateTime();
            DateTime end = new DateTime();

            int first, last = new int();
            int month, year = new int();

            if (rangeType == "ThisMonth")
            {

                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "LastMonth")
            {
                month = DateTime.Now.Month - 1;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "DateRange")
            {
                System.Globalization.CultureInfo ci = System.Globalization.CultureInfo.CreateSpecificCulture("en-GB");
                startDateStr = Convert.ToDateTime(startDate, ci.DateTimeFormat).ToString("d");//short date pattern
                endDateStr = Convert.ToDateTime(endDate, ci.DateTimeFormat).ToString("d");//short date pattern

                var startTime = TimeSpan.Parse("00:00:00");
                var endTime = TimeSpan.Parse("23:59:59");

                DateTime stockStartDate = Convert.ToDateTime(startDateStr) + startTime;
                DateTime stockEndDate = Convert.ToDateTime(endDateStr) + endTime;

                start = stockStartDate; //DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                end = stockEndDate; //DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            else
            {
                start = DateTime.Now;
                end = DateTime.Now;
            }

            var vaults = await context.Mis.Where(p => p.StockId == productId && (p.Operation.Operation == "Waste" || p.Operation.Operation == "Issuance") && (p.Date >= start && p.Date <= end)).ToListAsync();
            var query = vaults.Sum(x => x.CardQuantity);
            var vaultCount = context.Mis.Where(p => p.StockId == productId).LastOrDefault();

            var StockSummaryResource = new StockSummaryResource()
            {
                StockCount = query,
                CurrentStock = Convert.ToInt32(vaultCount.ClosingBalance),
                Filter = rangeType
            };

            return Ok(StockSummaryResource);
        }


        [HttpGet("{clientId}/ProductStockSummary")]
        public async Task<IEnumerable<StockVaultModel>> GetClientProductVaults(int clientId, string rangeType, [FromQuery]string startDate, [FromQuery]string endDate)
        {

            var startDateStr = "";
            var endDateStr = "";

            DateTime start = new DateTime();
            DateTime end = new DateTime();

            int first, last = new int();
            int month, year = new int();

            if (rangeType == "ThisMonth")
            {

                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "LastMonth")
            {
                month = DateTime.Now.Month - 1;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);

            }
            else if (rangeType == "DateRange")
            {

                System.Globalization.CultureInfo ci = System.Globalization.CultureInfo.CreateSpecificCulture("en-GB");
                startDateStr = Convert.ToDateTime(startDate, ci.DateTimeFormat).ToString("d");//short date pattern
                endDateStr = Convert.ToDateTime(endDate, ci.DateTimeFormat).ToString("d");//short date pattern

                var startTime = TimeSpan.Parse("00:00:00");
                var endTime = TimeSpan.Parse("23:59:59");

                DateTime stockStartDate = Convert.ToDateTime(startDateStr) + startTime;
                DateTime stockEndDate = Convert.ToDateTime(endDateStr) + endTime;

                start = stockStartDate; //DateTime.ParseExact(startDate, "dd/MM/yyyy: ", CultureInfo.InvariantCulture);
                end = stockEndDate; //DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            }
            else
            {
                month = DateTime.Now.Month;
                year = DateTime.Now.Year;

                first = 1;
                last = DateTime.DaysInMonth(year, month);

                var raw1 = year + "-" + month + "-" + first;
                var raw2 = year + "-" + month + "-" + last;

                start = DateTime.Parse(raw1);
                end = DateTime.Parse(raw2);
            }

            var products = await context.Stock.Where(c => c.ClientId == clientId && c.CategoryId == 1).OrderByDescending(o => o.Id).ToListAsync();
            var productModel = mapper.Map<IEnumerable<Stock>, IEnumerable<StockVaultModel>>(products);

            foreach (var item in productModel)
            {
                item.TotalAddition = GetAdditions(item.Id, start, end);
                item.TotalIssuance = GetIssuance(item.Id, start, end);
                item.TotalWaste = GetWaste(item.Id, start, end);
                item.OpeningStock = GetOpeningStock(item.Id, start, end);
                item.ClosingBalance = (item.OpeningStock + item.TotalAddition - item.TotalWaste - item.TotalIssuance); //GetClosingStock(item.Id, start, end);
                var lastedDate = GetLastUpdate(item.Id);
                if (lastedDate == null)
                {
                    item.Date = item.Date;
                }
                else
                {
                    item.Date = Convert.ToDateTime(lastedDate);
                }
                //     //item.Date = GetLastUpdate(item.Id);
            }

            return productModel;
        }

        private String GetLastUpdate(int productId)
        {
            string lastUpdate;
            var query = context.Mis.Where(p => p.StockId == productId).LastOrDefault();

            if (query != null)
            {
                lastUpdate = query.Date.ToString();
            }
            else
            {
                lastUpdate = null;
            }

            return lastUpdate;
        }

        private int GetOpeningStock(int productId, DateTime start, DateTime end)
        {
            var balance = 0;
            var query = context.Operations.Where(a => a.StockId == productId && a.Date < start);

            foreach (var item in query)
            {
                if (item.Operation == "New Stock")
                {
                    balance = balance + Int32.Parse(item.Quantity.ToString());
                }
                else if (item.Operation == "Issuance")
                {
                    balance = balance - Int32.Parse(item.Quantity.ToString());
                }
                else if (item.Operation == "Waste")
                {
                    balance = balance + Int32.Parse(item.Quantity.ToString());
                }
            }

            return balance;

        }

        private int GetClosingStock(int productId, DateTime start, DateTime end)
        {
            var balance = 0;
            var query = context.Operations.Where(a => a.StockId == productId && a.Date < end);

            foreach (var item in query)
            {
                if (item.Operation == "New Stock")
                {
                    balance = balance + Int32.Parse(item.Quantity.ToString());
                }
                else if (item.Operation == "Issuance")
                {
                    balance = balance - Int32.Parse(item.Quantity.ToString());
                }
                else if (item.Operation == "Waste")
                {
                    balance = balance + Int32.Parse(item.Quantity.ToString());
                }
            }

            return balance;
        }

        private int GetAdditions(int productId, DateTime start, DateTime end)
        {

            return context.Operations.Where(a => a.StockId == productId && a.Operation == "New Stock" && (a.Date >= start && a.Date <= end)).Select(s => s.Quantity).Sum();
        }

        private int GetIssuance(int productId, DateTime start, DateTime end)
        {
            var query = context.Operations.Where(a => a.StockId == productId && a.Operation == "Issuance" && (a.Date >= start && a.Date <= end)).Select(s => s.Quantity).Sum();
            return query;
        }

        private int GetWaste(int productId, DateTime start, DateTime end)
        {
            return context.Operations.Where(a => a.StockId == productId && a.Operation == "Waste" && (a.Date >= start && a.Date <= end)).Select(s => s.Quantity).Sum();
        }



    }
}