import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ClassicEditor, Bold, Essentials, Italic, Paragraph } from 'ckeditor5';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements AfterViewInit, OnDestroy {

  @ViewChild('editor') editorElement!: ElementRef;

  public editorInstance: any;
  ngOnDestroy(): void {
    // Cleanup CKEditor instance
    if (this.editorInstance) {
      this.editorInstance.destroy().catch((error: any) => console.error(error));
    }
  }
  ngAfterViewInit(): void {
    // Truy cập ClassicEditor từ window
    const ClassicEditor = (window as any).ClassicEditor;

    // ClassicEditor.create(this.editorElement.nativeElement, {
    //   toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
    // })
    //   .then((editor: any) => {
    //     this.editorInstance = editor;
    //   })
    //   .catch((error: any) => {
    //     console.error('Error initializing CKEditor:', error);
    //   });

    ClassicEditor.create(this.editorElement.nativeElement, {
      toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'outdent',
        'indent',
        'imageUpload',
        '|',
        'undo',
        'redo',
      ],
      simpleUpload: {
        // URL API Upload
        uploadUrl: 'http://localhost:5211/api/Recipe/image/upload',

      }
    })
      .then((editor: any) => {
        this.editorInstance = editor;
      })
      .catch((error: any) => {
        console.error('Error initializing CKEditor:', error);
      });
  }
  // public Editor = ClassicEditor;
  // public config = {
  //   licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Njc5MTY3OTksImp0aSI6ImVkZmRhM2I2LTU4M2MtNDg4NS1iMmY0LWE1ZDQ0NzkxMTMxNCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiNDgzNzlkMzMifQ.5GN1_cS-rYRIIoUtJzieCbbBDp0AN02RTKDzgTCWcLsAXe5KGNVLUXbDVGhbKs8OPM1teCnzg6dNLoSZvajtpQ',
  //   toolbar: [
  //     'heading',
  //     '|',
  //     'bold',
  //     'italic',
  //     'link',
  //     'bulletedList',
  //     'numberedList',
  //     '|',
  //     'blockQuote',
  //     'undo',
  //     'redo',
  //     '|',
  //     'imageUpload'
  //   ],
  //   // plugins: [ Essentials, Paragraph, Bold, Italic ],
  //   // toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|' ],
  //   image: {
  //     toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
  //   }
  // };
  //
  // // Custom Adapter for Upload
  // public onReady(editor: any): void {
  //   editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
  //     return new CustomUploadAdapter(loader);
  //   };
  // }
}

// Upload Adapter Class
// class CustomUploadAdapter {
//   constructor(private loader: any) {}
//
//   upload() {
//     return this.loader.file.then((file: File) => {
//       return new Promise((resolve, reject) => {
//         const formData = new FormData();
//         formData.append('file', file);
//
//         // Gửi request API
//         fetch('http://localhost:5211/api/Recipe/image/upload', {
//           method: 'POST',
//           body: formData
//         })
//           .then(response => response.json())
//           .then(data => {
//             resolve({
//               default: data.imgUrl
//             });
//           })
//           .catch(error => {
//             reject(error);
//           });
//       });
//     });
//   }
//
//   abort() {
//     // Handle abort logic nếu cần
//   }
//
// }
