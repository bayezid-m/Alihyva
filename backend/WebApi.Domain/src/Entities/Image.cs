using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Domain.src.Entities
{
    public class Image : BaseEntityId
    {
        public string Link { get; set; }
    }
}