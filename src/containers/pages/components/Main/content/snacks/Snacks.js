import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Snacks extends Component {
    render() {
        return (
            <div>
                THIS IS THE SNACKS PAGE
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Snacks)
