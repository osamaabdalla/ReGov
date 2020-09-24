import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { FormField } from 'react-form';
import '../../api/media/images.js';

class FileUploader extends Component {

    constructor(props){
       super(props);
       this.state = {
           files: false
       }
    }

    onDrop(files) {
      const self = this;
      this.setState({
         files:files[0]
       });
       Images.insert(files[0], function (err, fileObj) {
         self.props.onChange(files[0]);
       });
    }

    removeImage(e){
      e.preventDefault();
      this.setState({
        files: []
      });
      this.props.onChange('');
    }

    render(){
      if(this.state.files){
          return (<div className="preview-img" >
              <div key={this.state.files.name}>
                  <img src={this.state.files.preview} className="preview" />
              </div>
            <a href="#" onClick={(e) => this.removeImage(e)}>Delete</a>
          </div>
        )
      }

      if(this.props.value){
        return (<div className="preview-img" >
            <div key={this.props.value}>
                <img src={this.props.value} className="preview" />
            </div>
           <a href="#" onClick={(e) => this.removeImage(e)}>Delete</a>
        </div>
      )
    }

     return(
        <div className="editor_uploader">
         <Dropzone
           ref={(node) => { dropzoneRef = node; }}
           accept="image/jpeg, image/png"
           multiple={false}
           onDrop={this.onDrop.bind(this)}
           style={{
             width: '100%',
             backgroundColor: '#efefef',
             borderWidth: 1,
             borderColor: '#DDDDDD',
             height: '250px',
             lineHeight: '250px',
             textAlign: 'center',
             fontSize: 20,
             fontWeight: 'bold',
             cursor: 'pointer',
           }}
           >
            <p>Drop/Select file {this.props.value}</p>
         </Dropzone>
      </div>
     )
   }
}

export const FeaturedImages =  ({field, ...rest}) => {
  return (
    <FormField field={field}>
      {({ setValue, getValue, setTouched }) => {
        return (
          <FileUploader
            value={getValue()}
            onChange={(value) => {setValue(value)}}
          />
        )
      }}
    </FormField>
  )
}