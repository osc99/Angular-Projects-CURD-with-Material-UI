import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {
  empForm:FormGroup;
  education:string[]=[
    '10th',
    '12th',
    'Diploma',
    'Graduation',
    'Post Graduation'
  ]

  constructor(
    private _fb:FormBuilder, 
    private _empService:EmployeeService, 
    private _dialogRef:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService:CoreService,
    ){
    this.empForm = _fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
  }

  ngOnInit():void{
    this.empForm.patchValue(this.data)
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next:(val:any)=>{
            //alert("Employee profile updated Succesfully");
            this._coreService.openSnackBar('Employee profile updated Succesfully!', 'done');
            this._dialogRef.close(true);
          },
          error:(err)=>{
              console.error(err);
          }
        });
      }
      else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next:(val:any)=>{
            //alert("Employee added Succesfully");
            this._coreService.openSnackBar('Employee added Succesfully','done');
            this._dialogRef.close(true);
          },
          error:(err)=>{
              console.error(err);
          }
        });
      }
      
    }
  }
}
