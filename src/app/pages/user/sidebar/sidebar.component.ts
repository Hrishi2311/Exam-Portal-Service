import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: any;

  constructor(private cat:CategoryService) { }

  ngOnInit(): void {

    this.cat.categories().subscribe(
      (data:any)=>{
       this.categories=data;
      },
      err=>{
      Swal.fire('Oh!Sorry','Server Busy,please try again','error');
      });
    }


  }


    
