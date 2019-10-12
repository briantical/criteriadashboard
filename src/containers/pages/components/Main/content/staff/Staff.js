import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Staff extends Component {
    render() {
        return (
            <div>
                THIS IS THE STAFF PAGE
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Staff)
